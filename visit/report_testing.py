#coding=utf-8
from django.conf import settings
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, inch
from reportlab.pdfgen import canvas
from reportlab.platypus import Image, Paragraph, Table, Frame, SimpleDocTemplate, PageTemplate, PageBreak, NextPageTemplate
import os
from django.http import HttpResponse
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY

class fcMaker(object):
  """"""
  styles = {}
  def __init__(self, response):
      # install the fonts we need
      oleo_font = os.path.join(settings.STATIC_ROOT, 'fonts/OleoScript-Regular.ttf')
      pdfmetrics.registerFont(TTFont("Oleo Regular", oleo_font))

      noto_font = os.path.join(settings.STATIC_ROOT, 'fonts/NotoSans-Regular.ttf')
      pdfmetrics.registerFont(TTFont("Noto Regular", noto_font))

      sumana_bold_font = os.path.join(settings.STATIC_ROOT, 'fonts/Sumana-Bold.ttf')
      pdfmetrics.registerFont(TTFont("Sumana Bold", sumana_bold_font))

      martel_reg_font = os.path.join(settings.STATIC_ROOT, 'fonts/MartelSans-Regular.ttf')
      pdfmetrics.registerFont(TTFont("Martel Regular", martel_reg_font))

      martel_semi_font = os.path.join(settings.STATIC_ROOT, 'fonts/MartelSans-SemiBold.ttf')
      pdfmetrics.registerFont(TTFont("Martel Semi", martel_semi_font))

      martel_bold_font = os.path.join(settings.STATIC_ROOT, 'fonts/MartelSans-Bold.ttf')
      pdfmetrics.registerFont(TTFont("Martel Bold", martel_bold_font))

      kruti_reg_font = os.path.join(settings.STATIC_ROOT, 'fonts/Kruti_Dev_500.ttf')
      pdfmetrics.registerFont(TTFont("Kruti 500", kruti_reg_font))

      kruti_bold_font = os.path.join(settings.STATIC_ROOT, 'fonts/Kruti_Dev_712.ttf')
      pdfmetrics.registerFont(TTFont("Kruti 712", kruti_bold_font))


      self.PAGE_SIZE = A4
      self.buffer = response
      self.width, self.height = self.PAGE_SIZE
      fcMaker.styles['default']= ParagraphStyle(
                  'default',
                  fontName='Times-Roman',
                  fontSize=10,
                  leading=12,
                  leftIndent=0,
                  rightIndent=0,
                  firstLineIndent=0,
                  alignment=TA_LEFT,
                  spaceBefore=0,
                  spaceAfter=0,
                  bulletFontName='Times-Roman',
                  bulletFontSize=10,
                  bulletIndent=0,
                  textColor= colors.black,
                  backColor=None,
                  wordWrap=None,
                  borderWidth= 0,
                  borderPadding= 0,
                  borderColor= None,
                  borderRadius= None,
                  allowWidows= 1,
                  allowOrphans= 0,
                  textTransform=None,  # 'uppercase' | 'lowercase' | None
                  endDots=None,
                  splitLongWords=1,
              );

      fcMaker.styles['title'] = ParagraphStyle(
              'title',
              parent=fcMaker.styles['default'],
              fontName='Oleo Regular',
              fontSize=24,
              leading=42,
              alignment=TA_CENTER,
              textColor=colors.red,
          )
      fcMaker.styles['head'] = ParagraphStyle(
              'head',
              parent=fcMaker.styles['default'],
              fontName='Helvetica-Bold',
              fontSize=12,
              leading=14,
              alignment=TA_CENTER,
              textColor=colors.blue,
          )

      fcMaker.styles['text'] = ParagraphStyle(
              'head',
              parent=fcMaker.styles['default'],
              fontName='Martel Regular',
              fontSize=12,
              leading=14,
              alignment=TA_JUSTIFY,
              textColor=colors.blue,
          )

      fcMaker.styles['hi'] = ParagraphStyle(
              'hi',
              parent=fcMaker.styles['default'],
              fontName='Martel Semi',
              fontSize=12,
              leading=14,
              alignment=TA_LEFT,
              textColor=colors.blue,
          )

      fcMaker.styles['Headhi'] = ParagraphStyle(
              'Headhi',
              parent=fcMaker.styles['default'],
              fontName='Martel Bold',
              fontSize=14,
              leading=16,
              alignment=TA_LEFT,
              textColor=colors.blue,
          )


      fcMaker.styles['head2'] = ParagraphStyle(
              'head2',
              parent=fcMaker.styles['default'],
              fontName='Helvetica-Bold',
              fontSize=10,
              leading=12,
              alignment=TA_CENTER,
              textColor=colors.blue,
          )

      fcMaker.styles['top'] = ParagraphStyle(
              'top',
              parent=fcMaker.styles['default'],
              fontName='Helvetica-Bold',
              fontSize=10,
              leading=12,
              alignment=TA_RIGHT,
              textColor=colors.blue,
              borderPadding = 10,
          )

      fcMaker.styles['alert'] = ParagraphStyle(
              'alert',
              parent=fcMaker.styles['default'],
              leading=14,
              backColor=colors.yellow,
              borderColor=colors.black,
              borderWidth=1,
              borderPadding=5,
              borderRadius=2,
              spaceBefore=10,
              spaceAfter=10,
          )

      fcMaker.data = {
        'patient_name': "Abhishek Rai",
        'patient_age': "28",
        'patient_sex': "M",
        'visits': None
      }

  @staticmethod
  def _header_footer(canvas, doc):
    #save the state before making any changes
    canvas.saveState()

    file_path = os.path.join(settings.STATIC_ROOT, 'img/logo.jpg')
    logo = Image(file_path)
    logo.drawHeight = 99
    logo.drawWidth = 99

    logo.wrapOn(canvas, doc.width, doc.height)
    logo.drawOn(canvas, *fcMaker.coordinates(0.15, 1.50,doc.height, inch))

    # Title Page
    title = """Dr. Ashish Kumar Rai"""
    p = Paragraph(title, fcMaker.styles["title"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 0.75,doc.height, inch))

    title = """M.B.B.S. M.D. (Medicine)"""
    p = Paragraph(title, fcMaker.styles["head"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 1.00,doc.height, inch))

    title = """Regd.No. CGMC - 4657/2013"""
    p = Paragraph(title, fcMaker.styles["head"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 1.25,doc.height, inch))


    title = """CLINIC: Plot No. 24 Near Ganesh sweets, R.K. Nagar, Seepat Road Bilaspur (C.G.)"""
    p = Paragraph(title, fcMaker.styles["head2"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 1.50,doc.height, inch))


    title = """RESI: 28 Harsingar, R.K. Nagar Bilaspur (C.G.) """
    p = Paragraph(title, fcMaker.styles["head2"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 1.75,doc.height, inch))

    # insert the Line
    x1, y1 = fcMaker.coordinates(0.25, 1.85,doc.height, inch)
    x2, y2 = fcMaker.coordinates(8.0 , 1.85,doc.height, inch)
    canvas.line( x1,y1,x2,y2 );
    
    x1, y1 = fcMaker.coordinates(0.25, 2.15,doc.height, inch)
    x2, y2 = fcMaker.coordinates(8.0 , 2.15,doc.height, inch)
    canvas.line(x1,y1,x2,y2);


    title = """Timing: 5:00 PM to 8:00 PM. Sunday Closed"""
    p = Paragraph(title, fcMaker.styles["head"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 2.10,doc.height, inch))

    ## patient details 

    title = """Patient's Name: %s  Age: %s Sex: %s"""% ((fcMaker.data['patient_name'] + '.'*70)[:70], (fcMaker.data['patient_age']+ '.'*10)[:10],
    (fcMaker.data['patient_sex'] + '.'*10)[:10],)
    p = Paragraph(title, fcMaker.styles["text"])
    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.65, 2.45,doc.height, inch))

    ## insert horizontal line after patient name
    x1, y1 = fcMaker.coordinates(0.25, 2.65,doc.height, inch)
    x2, y2 = fcMaker.coordinates(8.0 , 2.65,doc.height, inch) 
    canvas.line(x1,y1,x2,y2);

    ## insert vertical line
    x1, y1 = fcMaker.coordinates(2.25, 2.65,doc.height, inch)
    x2, y2 = fcMaker.coordinates(2.25 , 10.75,doc.height, inch) 
    canvas.line(x1,y1,x2,y2);

    ## insert line at the end
    x1, y1 = fcMaker.coordinates(0.25, 10.75,doc.height, inch)
    x2, y2 = fcMaker.coordinates(8.0 , 10.75,doc.height, inch) 
    canvas.line(x1,y1,x2,y2);
    
    title = """07752-409149 &nbsp; <br/> MOB. 7987044826 &nbsp;"""
    p = Paragraph(title, fcMaker.styles["top"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0, 0.50,doc.height, inch))

    file_path = os.path.join(settings.STATIC_ROOT, 'img/rx.png')
    logo = Image(file_path)
    logo.drawHeight = 40
    logo.drawWidth = 40

    logo.wrapOn(canvas, doc.width, doc.height)
    logo.drawOn(canvas, *fcMaker.coordinates(2.35, 3.25,doc.height, inch))

    title = """कृपया दवाई डॉक्टर को दिखाकर ही प्रयोग करें  - 
    """
    p = Paragraph(title, fcMaker.styles["hi"])
    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.25, 11.00,doc.height, inch))

    title = """दवाइयों के लिए - """ 
    p = Paragraph(title, fcMaker.styles["Headhi"])
    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.85, 11.35,doc.height, inch))

    #release the canvas 
    canvas.restoreState()

  @staticmethod
  def _header_footer_page2(canvas, doc):
    #save the state before making any changes
    canvas.saveState()

    file_path = os.path.join(settings.STATIC_ROOT, 'img/logo.jpg')
    logo = Image(file_path)
    logo.drawHeight = 99
    logo.drawWidth = 99

    logo.wrapOn(canvas, doc.width, doc.height)
    logo.drawOn(canvas, *fcMaker.coordinates(0.15, 1.50,doc.height, inch))

    # Title Page
    title = """Dr. Ashish Kumar Rai"""
    p = Paragraph(title, fcMaker.styles["title"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 0.75,doc.height, inch))

    title = """M.B.B.S. M.D. (Medicine)"""
    p = Paragraph(title, fcMaker.styles["head"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 1.00,doc.height, inch))

    title = """Regd.No. CGMC - 4657/2013"""
    p = Paragraph(title, fcMaker.styles["head"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 1.25,doc.height, inch))


    title = """CLINIC: Plot No. 24 Near Ganesh sweets, R.K. Nagar, Seepat Road Bilaspur (C.G.)"""
    p = Paragraph(title, fcMaker.styles["head2"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 1.50,doc.height, inch))


    title = """RESI: 28 Harsingar, R.K. Nagar Bilaspur (C.G.) """
    p = Paragraph(title, fcMaker.styles["head2"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 1.75,doc.height, inch))

    # insert the Line
    x1, y1 = fcMaker.coordinates(0.25, 1.85,doc.height, inch)
    x2, y2 = fcMaker.coordinates(8.0 , 1.85,doc.height, inch)
    canvas.line( x1,y1,x2,y2 );
    
    x1, y1 = fcMaker.coordinates(0.25, 2.15,doc.height, inch)
    x2, y2 = fcMaker.coordinates(8.0 , 2.15,doc.height, inch)
    canvas.line(x1,y1,x2,y2);


    title = """Timing: 5:00 PM to 8:00 PM. Sunday Closed"""
    p = Paragraph(title, fcMaker.styles["head"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 2.10,doc.height, inch))

    ## patient details 

    title = """Patient's Name: %s  Age: %s Sex: %s"""% ((fcMaker.data['patient_name'] + '.'*70)[:70], (fcMaker.data['patient_age']+ '.'*10)[:10],
    (fcMaker.data['patient_sex'] + '.'*10)[:10],)
    p = Paragraph(title, fcMaker.styles["text"])
    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.65, 2.45,doc.height, inch))

    ## insert horizontal line after patient name
    x1, y1 = fcMaker.coordinates(0.25, 2.65,doc.height, inch)
    x2, y2 = fcMaker.coordinates(8.0 , 2.65,doc.height, inch) 
    canvas.line(x1,y1,x2,y2);

    ## insert line at the end
    x1, y1 = fcMaker.coordinates(0.25, 10.75,doc.height, inch)
    x2, y2 = fcMaker.coordinates(8.0 , 10.75,doc.height, inch) 
    canvas.line(x1,y1,x2,y2);
    
    title = """07752-409149 &nbsp; <br/> MOB. 7987044826 &nbsp;"""
    p = Paragraph(title, fcMaker.styles["top"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0, 0.50,doc.height, inch))

    file_path = os.path.join(settings.STATIC_ROOT, 'img/rx.png')
    logo = Image(file_path)
    logo.drawHeight = 40
    logo.drawWidth = 40

    logo.wrapOn(canvas, doc.width, doc.height)
    logo.drawOn(canvas, *fcMaker.coordinates(0.35, 3.25,doc.height, inch))

    title = """कृपया दवाई डॉक्टर को दिखाकर ही प्रयोग करें  - 
    """
    p = Paragraph(title, fcMaker.styles["hi"])
    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.25, 11.00,doc.height, inch))

    title = """दवाइयों के लिए - """ 
    p = Paragraph(title, fcMaker.styles["Headhi"])
    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.85, 11.35,doc.height, inch))

    #release the canvas 
    canvas.restoreState()


  def print_data(self):
      buffer = self.buffer
      doc = SimpleDocTemplate(buffer,
                              rightMargin=0,
                              leftMargin=0,
                              topMargin=0,
                              bottomMargin=0,
                              pagesize=self.PAGE_SIZE)

      # Our container for 'Flowable' objects
      elements = []

      print("Printing doc size ", doc.width, doc.height)
      print("Printing self size ", self.width, self.height)
      # A large collection of style sheets pre-made for us
      styles = getSampleStyleSheet()
      styles.add(ParagraphStyle(name='centered', alignment=TA_CENTER))

      # Draw things on the PDF. Here's where the PDF generation happens.
      # See the ReportLab documentation for the full list of functionality.
      # for single visit if text size exceed the some threshold the call 
      # TwoCol page and for each new visit call OneCol page.
      users = range(1,10000,1)
      elements.append(Paragraph('My User Names', styles['Heading1']))
      for i, user in enumerate(users):
          if i != 0 and (i % 41) == 0:
            elements.append(NextPageTemplate('TwoCol'))
            elements.append(PageBreak())

          elements.append(Paragraph(str(user), styles['Normal']))

      x1, y1 = fcMaker.coordinates(2.45,10.65, doc.height, inch)
      frame1 = Frame(x1,y1, doc.width - 3.05*inch, doc.height - 4.20*inch, showBoundary=1)
      x1, y1 = fcMaker.coordinates(0.45,10.65, doc.height, inch)
      frame2 = Frame(x1,y1, doc.width - 1.05*inch, doc.height - 4.20*inch, showBoundary=1)
  
      doc.addPageTemplates([PageTemplate(id='OneCol',frames=[frame1], onPage=self._header_footer),
      PageTemplate(id='TwoCol',frames=[frame2], onPage=self._header_footer_page2) ], )

      doc.build(elements,
                canvasmaker=NumberedCanvas)

      # Get the value of the BytesIO buffer and write it to the response.
      pdf = buffer.getvalue()
      buffer.close()
      return pdf

  @staticmethod
  def coordinates(x, y, height, unit=1):
    """
    Helper function for help with height.
    """
    x, y = x * unit, height -  y * unit
    return x,y

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




def fc_maker_view(request):
  response = HttpResponse(content_type='application/pdf')
  response['Content-Disposition'] = 'attachment; filename="pdf1.pdf"'
  doc = fcMaker(response)
  doc.print_data()
  return response