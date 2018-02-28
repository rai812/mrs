#coding=utf-8
from django.conf import settings
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, inch
from reportlab.pdfgen import canvas
from reportlab.platypus import Image, Paragraph, Table, Frame, SimpleDocTemplate, PageTemplate, PageBreak, NextPageTemplate, FrameBreak, Flowable
import os
from django.http import HttpResponse
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY

from visit.models import Visit, VisitContainer
from history.models import MedicalHistory

def repeat_to_length(string_to_expand, length):
    return (string_to_expand * (int(length/len(string_to_expand))+1))[:length]

def count_rows(input, col=66):
    length = len(input)
    return (int(length / col) + 1);
    

class DateLine(Flowable):
    """
    Print Date in canvas 
    """
 
    #----------------------------------------------------------------------
    def __init__(self, x=420, y=47, width=40, height=15, text=""):
        Flowable.__init__(self)
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.text = text
 
    #----------------------------------------------------------------------
    def draw(self):
        """
        Draw the shape, text, etc
        """
        self.canv.drawString(self.x+5, self.y+3, self.text)


class fcMaker(object):
  """"""
  styles = {}
  def __init__(self, response, visit_container):
      # install the fonts we need
      oleo_font = os.path.join(settings.STATIC_ROOT, 'fonts/OleoScript-Regular.ttf')
      pdfmetrics.registerFont(TTFont("Oleo Regular", oleo_font))

      noto_font = os.path.join(settings.STATIC_ROOT, 'fonts/NotoSans-Regular.ttf')
      pdfmetrics.registerFont(TTFont("Noto Regular", noto_font))

      sumana_bold_font = os.path.join(settings.STATIC_ROOT, 'fonts/Sumana-Bold.ttf')
      pdfmetrics.registerFont(TTFont("Sumana Bold", sumana_bold_font))

      yatra_font = os.path.join(settings.STATIC_ROOT, 'fonts/YatraOne-Regular.ttf')
      pdfmetrics.registerFont(TTFont("YatraOne Regular", yatra_font))

#       martel_reg_font = os.path.join(settings.STATIC_ROOT, 'fonts/MartelSans-Regular.ttf')
#       pdfmetrics.registerFont(TTFont("Martel Regular", martel_reg_font))
# 
#       martel_semi_font = os.path.join(settings.STATIC_ROOT, 'fonts/MartelSans-SemiBold.ttf')
#       pdfmetrics.registerFont(TTFont("Martel Semi", martel_semi_font))
# 
#       martel_bold_font = os.path.join(settings.STATIC_ROOT, 'fonts/MartelSans-Bold.ttf')
#       pdfmetrics.registerFont(TTFont("Martel Bold", martel_bold_font))

#       kruti_reg_font = os.path.join(settings.STATIC_ROOT, 'fonts/Kruti_Dev_500.ttf')
#       pdfmetrics.registerFont(TTFont("Kruti 500", kruti_reg_font))
# 
#       kruti_bold_font = os.path.join(settings.STATIC_ROOT, 'fonts/Kruti_Dev_712.ttf')
#       pdfmetrics.registerFont(TTFont("Kruti 712", kruti_bold_font))

      krishna = os.path.join(settings.STATIC_ROOT, 'fonts/K010.TTF')
      pdfmetrics.registerFont(TTFont("Krishna", krishna))


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

      self.styles['mix'] = ParagraphStyle(
              'mix',
              parent=self.styles['default'],
              fontName='Noto Regular',
              fontSize=12,
              leading=14,
              alignment=TA_LEFT,
              textColor=colors.black,
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

      fcMaker.data = {
        'patient_name': visit_container.patient_detail.full_name,
        'patient_age': visit_container.patient_detail.age,
        'patient_sex': visit_container.patient_detail.sex,
        'visit_container': visit_container,
        'visits': visit_container.visits.all(),
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

    ## here we will put the heading for vitals
    title = """ Weight <br/> <br/> P/CL/CN/I/O/L <br/> <br/> Temp <br/> <br/> 
    Pulse <br/> <br/> BP <br/> <br/> RR <br/> <br/> CNS <br/> <br/> Chest <br /> <br/> CVS <br/>  <br/> PA <br/> <br/> Tests"""
    p = Paragraph(title, fcMaker.styles["side_head"])
    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.35, 7.00,doc.height, inch))



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


    title = """<font size=20> NATH </font> PHARMACY & PATHOLOGY """
    p = Paragraph(title, fcMaker.styles["Headhi2"])
    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 11.25,doc.height, inch))

    title = """Plot No. 24 Near Ganesh sweets, R.K. Nagar, Seepat Road Bilaspur (C.G.)"""
    p = Paragraph(title, fcMaker.styles["head2"])

    p.wrapOn(canvas, doc.width, doc.height)
    p.drawOn(canvas, *fcMaker.coordinates(0.15, 11.60, doc.height, inch))

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
#       users = range(1,10000,1)
#       elements.append(Paragraph('My User Names', styles['Heading1']))
#       count = 1
#       next_page = False
#       for i, user in enumerate(users):
#           if(next_page):
#               count = count +  count_rows(repeat_to_length(str(user), 80), 81)
#           else:
#               count = count + count_rows(repeat_to_length(str(user), 80))
#           
# #           print(count);
#           if count > 41:
#             elements.append(NextPageTemplate('TwoCol'))
#             elements.append(PageBreak())
#             next_page = True
#             count = 0;
# 
#           elements.append(Paragraph(repeat_to_length(str(user), 80), styles['Normal']))

      ## according to observations 60 words per column and 41 Rows fill in the space
      
      ## Systematically print the VISIT data 
      
      ## keep the count so that we can make decision on page break
      ## history first
      next_page = False
      count = 1
      visits = fcMaker.data['visits']
      visit_count = 1;
      visit_size = len(visits)
      for visit in visits:
          ## print the visit date
          elements.append(DateLine(text=visit.visit_date.strftime('%d-%m-%y')));
          
          ## first print the vitals then break frame
          weight      = visit.vitals.weight or "NAD"
          p_ce_cn_iol = visit.vitals.p_ce_cn_iol or "NAD"
          temp        = visit.vitals.temp or "NAD"
          pulse       = visit.vitals.pulse or "NAD"
          bp          = visit.vitals.bp or "NAD"
          rr          = visit.vitals.rr or "NAD"
          cns         = visit.vitals.cns or "NAD"
          chest       = visit.vitals.chest or "NAD"
          cvs         = visit.vitals.cvs or "NAD"
          pa          = visit.vitals.pa or "NAD"
          tests       = visit.vitals.tests or "NAD"
          
          title = " %s KG <br/> <br/> %s <br/> <br/> %s <br/> <br/> \
            %s bpm<br/> <br/> %s mmHg<br/> <br/> %s bpm<br/> <br/> %s <br/> <br/> %s cm<br /> <br/> %s <br/>  <br/> %s <br/> <br/>" % (
                weight,p_ce_cn_iol,temp,pulse,bp,rr,cns,chest,cvs,pa);
          elements.append(Paragraph(title, styles['Normal']))
          elements.append(FrameBreak())
          
          elements.append(Paragraph(str(tests)[0:420], styles['Normal']))
          elements.append(FrameBreak())
          
          ## add history to first visit only
          if(visit_count == 1):              
              history = MedicalHistory.objects.filter(patient_detail=fcMaker.data['visit_container'].patient_detail.patient_id)
              elements.append(Paragraph('Medical History', styles['Heading2']))
              for h in history:
                  if(next_page):
                      count = count +  count_rows(str(h.status), 81)
                  else:
                      count = count + count_rows(str(h.status))
                  if count > 41:
                    count = 0;
                    next_page = True
                    elements.append(NextPageTemplate('TwoCol'))
                    elements.append(PageBreak())
                
                  elements.append(Paragraph(str(h.status), styles['Normal']))
                    
              elements.append(Paragraph("<br/>", styles['Normal'])); 
              count = count +1;
    
          ## now the complaints of visit
          
          complaints = visit.complaints.all();
          final_str = ", ".join([x.description for x in complaints])
          if(next_page):
              count = count +  count_rows(str(final_str), 81)
          else:
              count = count + count_rows(str(final_str))
          if count > 41:
            count = 0;
            next_page = True
            elements.append(NextPageTemplate('TwoCol'))
            elements.append(PageBreak())
        
          elements.append(Paragraph('Complaints', styles['Heading2']))
          elements.append(Paragraph(str(final_str), styles['Normal']))
    
          elements.append(Paragraph("<br/>", styles['Normal'])); 
          count = count +1;
    
          ## vitals would be added via headers so add diagnosis
          
          medicines = visit.medicines.all();
          elements.append(Paragraph('Medication', styles['Heading2']))
          for h in medicines:
              if(next_page):
                  count = count +  count_rows(h.getDisplayValue(), 81)
              else:
                  count = count + count_rows(h.getDisplayValue())
              if count > 41:
                count = 0;
                next_page = True
                elements.append(NextPageTemplate('TwoCol'))
                elements.append(PageBreak())
            
              elements.append(Paragraph(h.getDisplayValue(), fcMaker.styles["mix"]))
    
          elements.append(Paragraph("<br/>", styles['Normal'])); 
          count = count +1;
          
          ## now the diagnose
          
          diagnose = visit.diagnose.all();
          final_str = ", ".join([x.name for x in diagnose])
          if(next_page):
              count = count +  count_rows(str(final_str), 81)
          else:
              count = count + count_rows(str(final_str))
          if count > 41:
            count = 0;
            next_page = True
            elements.append(NextPageTemplate('TwoCol'))
            elements.append(PageBreak())
          
          elements.append(Paragraph('Diagnose', styles['Heading2']))
          elements.append(Paragraph(str(final_str), styles['Normal']))
    
          elements.append(Paragraph("<br/>", styles['Normal'])); 
          count = count +1;
          
          ## Now add the remark
          final_str = visit.remarks
          final_str = final_str.encode('utf-8');
          if(next_page):
              count = count +  count_rows(str(final_str), 81)
          else:
              count = count + count_rows(str(final_str))
          if count > 41:
            count = 0;
            next_page = True
            elements.append(NextPageTemplate('TwoCol'))
            elements.append(PageBreak())
        
          elements.append(Paragraph('Remark', styles['Heading2']))
          elements.append(Paragraph(str(final_str), styles['Normal']))
          
          elements.append(Paragraph("<br/>", styles['Normal'])); 
          count = count +1;
          
          ## if visit is last then don't break
          if visit_count != visit_size:
              elements.append(NextPageTemplate('OneCol'))
              elements.append(PageBreak())
          
          visit_count = visit_count + 1;
      
      x1, y1 = fcMaker.coordinates(2.45,10.65, doc.height, inch)
      frame1 = Frame(x1,y1, doc.width - 3.05*inch, doc.height - 4.20*inch, showBoundary=0)
      
      x1, y1 = fcMaker.coordinates(0.45,10.65, doc.height, inch)
      frame2 = Frame(x1,y1, doc.width - 1.05*inch, doc.height - 4.20*inch, showBoundary=0)
  
      x1, y1 = fcMaker.coordinates(1.25 ,10.65, doc.height, inch)
      vital_frame = Frame(x1,y1, doc.width - 7.35*inch, doc.height - 4.25*inch, showBoundary=0)

      x1, y1 = fcMaker.coordinates(0.45 ,10.65, doc.height, inch)
      test_frame = Frame(x1,y1, doc.width - 6.57*inch, doc.height - 8.00*inch, showBoundary=0)
  
      
      doc.addPageTemplates([PageTemplate(id='OneCol',frames=[vital_frame, test_frame,frame1], onPage=self._header_footer),
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
        self.drawRightString(200 * mm, 15 * mm + (0.2 * inch),
                             "Page %d of %d" % (self._pageNumber, page_count))




def fc_maker_view(request, pk):
    
  visit_container = VisitContainer.objects.get(id=pk);
  response = HttpResponse(content_type='application/pdf')
  response['Content-Disposition'] = 'attachment; filename="%s-%s.pdf"' %(visit_container.patient_detail.full_name,visit_container.visit_date.strftime('%d-%m-%y'))
  doc = fcMaker(response, visit_container)
  doc.print_data()
  return response