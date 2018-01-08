#coding=utf-8
from django.conf import settings
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, inch
from reportlab.pdfgen import canvas
from reportlab.platypus import Image, Paragraph, Table, Frame
import os
from django.http import HttpResponse
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY

class ReportMaker(object):
  """"""
  def __init__(self, response):
      # install the fonts we need
      oleo_font = os.path.join(settings.STATIC_ROOT, 'fonts/OleoScript-Regular.ttf')
      pdfmetrics.registerFont(TTFont("Oleo Regular", oleo_font))

      noto_font = os.path.join(settings.STATIC_ROOT, 'fonts/NotoSans-Regular.ttf')
      pdfmetrics.registerFont(TTFont("Noto Regular", noto_font))

      sumana_bold_font = os.path.join(settings.STATIC_ROOT, 'fonts/Sumana-Bold.ttf')
      pdfmetrics.registerFont(TTFont("Sumana Bold", sumana_bold_font))

      yatra_font = os.path.join(settings.STATIC_ROOT, 'fonts/YatraOne-Regular.ttf')
      pdfmetrics.registerFont(TTFont("YatraOne Regular", yatra_font))


      self.PAGE_SIZE = A4
      self.c = canvas.Canvas(response, pagesize=self.PAGE_SIZE)
      self.width, self.height = self.PAGE_SIZE
      self.styles= {
              'default': ParagraphStyle(
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
              ),
          }
      self.styles['title'] = ParagraphStyle(
              'title',
              parent=self.styles['default'],
              fontName='Oleo Regular',
              fontSize=24,
              leading=42,
              alignment=TA_CENTER,
              textColor=colors.red,
          )
      self.styles['head'] = ParagraphStyle(
              'head',
              parent=self.styles['default'],
              fontName='Helvetica-Bold',
              fontSize=12,
              leading=14,
              alignment=TA_CENTER,
              textColor=colors.blue,
          )

      self.styles['side_head'] = ParagraphStyle(
              'side_head',
              parent=self.styles['default'],
              fontName='Helvetica-Bold',
              fontSize=10,
              leading=12,
              alignment=TA_LEFT,
              textColor=colors.black,
          )


      self.styles['text'] = ParagraphStyle(
              'text',
              parent=self.styles['default'],
              fontName='YatraOne Regular',
              fontSize=12,
              leading=14,
              alignment=TA_LEFT,
              textColor=colors.blue,
          )

      self.styles['hi'] = ParagraphStyle(
              'hi',
              parent=self.styles['default'],
              fontName='Noto Regular',
              fontSize=12,
              leading=14,
              alignment=TA_LEFT,
              textColor=colors.blue,
          )

      self.styles['Headhi'] = ParagraphStyle(
              'Headhi',
              parent=self.styles['default'],
              fontName='YatraOne Regular',
              fontSize=14,
              leading=16,
              alignment=TA_LEFT,
              textColor=colors.blue,
          )

      self.styles['Headhi2'] = ParagraphStyle(
              'Headhi2',
              parent=self.styles['default'],
              fontName='YatraOne Regular',
              fontSize=14,
              leading=16,
              alignment=TA_CENTER,
              textColor=colors.red,
          )


      self.styles['head2'] = ParagraphStyle(
              'head2',
              parent=self.styles['default'],
              fontName='Helvetica-Bold',
              fontSize=10,
              leading=12,
              alignment=TA_CENTER,
              textColor=colors.blue,
          )

      self.styles['top'] = ParagraphStyle(
              'top',
              parent=self.styles['default'],
              fontName='Helvetica-Bold',
              fontSize=10,
              leading=12,
              alignment=TA_RIGHT,
              textColor=colors.blue,
              borderPadding = 10,
          )

      self.styles['alert'] = ParagraphStyle(
              'alert',
              parent=self.styles['default'],
              leading=14,
              backColor=colors.yellow,
              borderColor=colors.black,
              borderWidth=1,
              borderPadding=5,
              borderRadius=2,
              spaceBefore=10,
              spaceAfter=10,
          )

      self.data = {
        'patient_name': "Abhishek Rai",
        'patient_age': "28",
        'patient_sex': "M",
        'visits': None
      }

  def createDocument(self):
      """"""
      file_path = os.path.join(settings.STATIC_ROOT, 'img/logo.jpg')

      logo = Image(file_path)
      logo.drawHeight = 99
      logo.drawWidth = 99

      logo.wrapOn(self.c, self.width, self.height)
      logo.drawOn(self.c, *self.coord(0.15, 1.50, inch))

      # Title Page
      title = """Dr. Ashish Kumar Rai"""
      p = Paragraph(title, self.styles["title"])
      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0.15, 0.75, inch))

      title = """M.B.B.S. M.D. (Medicine)"""
      p = Paragraph(title, self.styles["head"])

      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0.15, 1.00, inch))

      title = """Regd.No. CGMC - 4657/2013"""
      p = Paragraph(title, self.styles["head"])

      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0.15, 1.25, inch))


      title = """CLINIC: Plot No. 24 Near Ganesh sweets, R.K. Nagar, Seepat Road Bilaspur (C.G.)"""
      p = Paragraph(title, self.styles["head2"])

      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0.15, 1.50, inch))


      title = """RESI: 28 Harsingar, R.K. Nagar Bilaspur (C.G.) """
      p = Paragraph(title, self.styles["head2"])

      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0.15, 1.75, inch))

      # insert the Line
      x1, y1 = self.coord(0.25, 1.85, inch)
      x2, y2 = self.coord(8.0 , 1.85, inch)
      self.c.line( x1,y1,x2,y2 );
      
      x1, y1 = self.coord(0.25, 2.15, inch)
      x2, y2 = self.coord(8.0 , 2.15, inch)
      self.c.line(x1,y1,x2,y2);


      title = """Timing: 5:00 PM to 8:00 PM. Sunday Closed"""
      p = Paragraph(title, self.styles["head"])

      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0.15, 2.10, inch))

      ## patient details 

      title = """Patient's Name: %s  Age: %s Sex: %s"""% ((self.data['patient_name'] + '.'*70)[:70], (self.data['patient_age']+ '.'*10)[:10],
      (self.data['patient_sex'] + '.'*10)[:10],)
      p = Paragraph(title, self.styles["text"])
      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0.65, 2.45, inch))

      ## insert horizontal line after patient name
      x1, y1 = self.coord(0.25, 2.65, inch)
      x2, y2 = self.coord(8.0 , 2.65, inch) 
      self.c.line(x1,y1,x2,y2);

      ## here we will put the heading for vitals
      title = """ Weight <br/> <br/> Height <br/> <br/> OE <br/> <br/> P/CL/CN/I/O/L <br/> <br/> Temp <br/> <br/> 
      Pulse <br/> <br/> BP <br/> <br/> RR <br/> <br/> CNS <br/> <br/> Chest <br /> <br/> CVS <br/>  <br/> PA <br/> <br/> Tests"""
      p = Paragraph(title, self.styles["side_head"])
      p.wrapOn(self.c, self.width, self.height)
      x2, y2 = self.coord(0.45, 7.00, inch)
      p.drawOn(self.c, x2, y2)

      ## insert vertical line
      x1, y1 = self.coord(2.25, 2.65, inch)
      x2, y2 = self.coord(2.25 , 10.75, inch) 
      self.c.line(x1,y1,x2,y2);

      ## insert line at the end
      x1, y1 = self.coord(0.25, 10.75, inch)
      x2, y2 = self.coord(8.0 , 10.75, inch) 
      self.c.line(x1,y1,x2,y2);
      
      title = """07752-409149 &nbsp; <br/> MOB. 7987044826 &nbsp;"""
      p = Paragraph(title, self.styles["top"])
      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0, 0.50, inch))

      file_path = os.path.join(settings.STATIC_ROOT, 'img/rx.png')
      logo = Image(file_path)
      logo.drawHeight = 40
      logo.drawWidth = 40

      logo.wrapOn(self.c, self.width, self.height)
      logo.drawOn(self.c, *self.coord(2.35, 3.25, inch))

      side2_text = """This is where and how the main text will appear on the rear of this card. <br/>"""* 30
      p_side2 = Paragraph(side2_text, self.styles["text"])
      front_page = []
      front_page.append(p_side2)

      f = Frame(2.45*inch, 1.0*inch, 5.54*inch, 7.35*inch, showBoundary=1)
      f.addFromList(front_page, self.c)


      title = """07752-409149 &nbsp; <br/> MOB. 7987044826 &nbsp;"""
      p = Paragraph(title, self.styles["top"])
      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0, 11.10, inch))


      title = """कृपया दवाई डॉक्टर को दिखाकर ही प्रयोग करें  - 
      """
      p = Paragraph(title, self.styles["text"])
      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0.25, 11.00, inch))

      title = """दवाइयों के लिए - """ 
      p = Paragraph(title, self.styles["Headhi"])
      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0.75, 11.25, inch))

      title = """<font size=20> NATH </font> PHARMACY & PATHOLOGY """
      p = Paragraph(title, self.styles["Headhi2"])
      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0.15, 11.25, inch))

      title = """Plot No. 24 Near Ganesh sweets, R.K. Nagar, Seepat Road Bilaspur (C.G.)"""
      p = Paragraph(title, self.styles["head2"])

      p.wrapOn(self.c, self.width, self.height)
      p.drawOn(self.c, *self.coord(0.15, 11.60, inch))

  def coord(self, x, y, unit=1):
      """
      Helper class to help position flowables in Canvas objects
      """
      x, y = x * unit, self.height -  y * unit
      return x, y

  def savePDF(self):
      """"""
      self.c.save()

def fc_maker_view(request):
  response = HttpResponse(content_type='application/pdf')
  response['Content-Disposition'] = 'attachment; filename="pdf1.pdf"'
  doc = ReportMaker(response)
  doc.createDocument()
  doc.savePDF()
  return response





