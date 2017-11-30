from io import BytesIO
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image, Table
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm

from django.conf import settings
import os

    
 
class MyPrint:
    def __init__(self, buffer, pagesize):
        self.buffer = buffer
        if pagesize == 'A4':
            self.pagesize = A4
        elif pagesize == 'Letter':
            self.pagesize = letter
        self.width, self.height = self.pagesize
 
    @staticmethod
    def _header_footer(canvas, doc):
        # Save the state of our canvas so we can draw on it
        canvas.saveState()
        styles = getSampleStyleSheet()
 
        # Header
        header = Paragraph('This is a multi-line header.  It goes on every page.   ' * 5, styles['Normal'])
        w, h = header.wrap(doc.width, doc.topMargin)
        header.drawOn(canvas, doc.leftMargin, doc.height + doc.topMargin - h)
 
        # Footer
        footer = Paragraph('This is a multi-line footer.  It goes on every page.   ' * 5, styles['Normal'])
        w, h = footer.wrap(doc.width, doc.bottomMargin)
        footer.drawOn(canvas, doc.leftMargin, h)
 
        # Release the canvas
        canvas.restoreState()


    def print_users(self):
            buffer = self.buffer
            doc = SimpleDocTemplate(buffer,
                                    rightMargin=72,
                                    leftMargin=72,
                                    topMargin=72,
                                    bottomMargin=72,
                                    pagesize=self.pagesize)
     
            # Our container for 'Flowable' objects
            elements = []
     
            # A large collection of style sheets pre-made for us
            styles = getSampleStyleSheet()
            styles.add(ParagraphStyle(name='centered', alignment=TA_CENTER))
     
            # Draw things on the PDF. Here's where the PDF generation happens.
            # See the ReportLab documentation for the full list of functionality.
            users = range(1,10000,1)
            elements.append(Paragraph('My User Names', styles['Heading1']))
            for i, user in enumerate(users):
                elements.append(Paragraph(str(user), styles['Normal']))
     
            doc.build(elements, onFirstPage=self._header_footer, onLaterPages=self._header_footer,
                      canvasmaker=NumberedCanvas)
     
            # Get the value of the BytesIO buffer and write it to the response.
            pdf = buffer.getvalue()
            buffer.close()
            return pdf

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self._saved_page_states = []
 
    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()
 
    def save(self):
        """add page info to each page (page x of y)"""
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)
 
    def draw_page_number(self, page_count):
        # Change the position of this to wherever you want the page number to be
        self.drawRightString(211 * mm, 15 * mm + (0.2 * inch),
                             "Page %d of %d" % (self._pageNumber, page_count))


class LetterMaker(object):
    """"""
 
    #----------------------------------------------------------------------
    def __init__(self, pdf_file, org, seconds):
        self.c = canvas.Canvas(pdf_file, pagesize=letter)
        self.styles = getSampleStyleSheet()
        self.width, self.height = letter
        self.organization = org
        self.seconds  = seconds
 
 
    #----------------------------------------------------------------------
    def createDocument(self):
        """"""
        voffset = 65
 
        # create return address
        address = """<font size="9">
        Dr. Ashish Kumar Rai<br/>
        M.B.B.S. M.D. (Medicine)<br/>
        Regd.No. CGMC-4657/2013<br/>
        CLINIC: Plot No. 24, Near Ganesh Sweets, R.K. Nagar, Seepat Road, Bilaspur (C.G.) <br/>
        RESI.: 28, Harsingar Colony, R. K. Nagar, Bilaspur (C.G.) <br/>
        <hr/> <br/>
        Timing: 5:00 PM to 8:00 PM. Sunday Closed. <br/> <hr/> </font>
        """
        p = Paragraph(address, self.styles["Normal"])        
 
        # add a logo and size it
        file_path = os.path.join(settings.STATIC_ROOT, 'img/logo.jpg')
        logo = Image(file_path)
        logo.drawHeight = 2*inch
        logo.drawWidth = 2*inch
##        logo.wrapOn(self.c, self.width, self.height)
##        logo.drawOn(self.c, *self.coord(140, 60, mm))
##        
 
        data = [[logo, p]]
        table = Table(data, colWidths=4*inch)
        table.setStyle([("VALIGN", (0,0), (0,0), "TOP")])
        table.wrapOn(self.c, self.width, self.height)
        table.drawOn(self.c, *self.coord(18, 60, mm))
 
        # insert body of letter
        ptext = "Dear Sir or Madam:"
        self.createParagraph(ptext, 20, voffset+35)
 
        ptext = """
        The document you are holding is a set of requirements for your next mission, should you
        choose to accept it. In any event, this document will self-destruct <b>%s</b> seconds after you
        read it. Yes, <b>%s</b> can tell when you're done...usually.
        """ % (self.seconds, self.organization)
        p = Paragraph(ptext, self.styles["Normal"])
        p.wrapOn(self.c, self.width-70, self.height)
        p.drawOn(self.c, *self.coord(20, voffset+48, mm))
 
    #----------------------------------------------------------------------
    def coord(self, x, y, unit=1):
        """
        # http://stackoverflow.com/questions/4726011/wrap-text-in-a-table-reportlab
        Helper class to help position flowables in Canvas objects
        """
        x, y = x * unit, self.height -  y * unit
        return x, y    
 
    #----------------------------------------------------------------------
    def createParagraph(self, ptext, x, y, style=None):
        """"""
        if not style:
            style = self.styles["Normal"]
        p = Paragraph(ptext, style=style)
        p.wrapOn(self.c, self.width, self.height)
        p.drawOn(self.c, *self.coord(x, y, mm))
 
    #----------------------------------------------------------------------
    def savePDF(self):
        """"""
        self.c.save()

def pdfTesting():
    doc = LetterMaker("example.pdf", "The MVP", 10)
    doc.createDocument()
    doc.savePDF()


if __name__ == '__main__':
    buffer = BytesIO()
      
    report = MyPrint(buffer, 'Letter')
    pdf = report.print_users()
  
    with open('arquivo.pdf', 'wb') as f:
        f.write(pdf)