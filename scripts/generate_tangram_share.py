from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'tangram-prof-junior-v12'/'tangram-share-final.jpg'
RAI=ROOT/'tangram-prof-junior'/'rai-chalk.webp'
W,H=1200,630

def font(size,bold=False):
    p='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
    return ImageFont.truetype(p,size)

im=Image.new('RGB',(W,H),(4,17,29))
px=im.load()
for y in range(H):
    for x in range(W):
        t=x/W
        r=int(4+4*t); g=int(17+18*t+8*y/H); b=int(29+24*t+4*y/H)
        px[x,y]=(r,g,b)
d=ImageDraw.Draw(im)
d.rounded_rectangle((14,14,W-14,H-14),28,outline=(33,110,137),width=2)

# subtle geometry
for pts,c in [
    ([(470,50),(585,50),(470,165)],(20,92,111)),
    ([(505,355),(625,475),(505,475)],(18,83,89)),
    ([(1090,65),(1170,145),(1090,225)],(58,45,104))
]:
    d.polygon(pts,fill=c)

# mascot card
rai=Image.open(RAI).convert('RGB')
side=min(rai.size)
rai=rai.crop(((rai.width-side)//2,(rai.height-side)//2,(rai.width+side)//2,(rai.height+side)//2)).resize((104,104),Image.LANCZOS)
mask=Image.new('L',(104,104),0); md=ImageDraw.Draw(mask); md.rounded_rectangle((0,0,103,103),22,fill=255)
im.paste(rai,(42,42),mask)
d.rounded_rectangle((40,40,148,148),24,outline=(74,188,170),width=2)

# typography
d.text((175,38),'Tangram',font=font(62,True),fill='white')
d.text((175,100),'Educativo',font=font(62,True),fill=(52,217,207))
d.text((177,172),'Prof. João Faustino Junior',font=font(24,True),fill=(196,225,233))
d.line((45,217,570,217),fill=(46,174,190),width=2)
d.text((45,245),'10 desafios interativos para',font=font(30),fill=(239,250,252))
d.text((45,288),'desenvolver lógica, geometria,',font=font(30,True),fill=(89,231,200))
d.text((45,331),'percepção espacial e estratégia.',font=font(30,True),fill=(113,180,255))

# badges
badges=[('📱','Instalável','no celular'),('🤖','R.A.I. Tutora','dicas e explicações'),('🧩','10 desafios','progressivos')]
x=45
for ico,a,b in badges:
    d.rounded_rectangle((x,400,x+180,474),16,fill=(8,36,51),outline=(44,104,126),width=2)
    d.text((x+16,414),ico,font=font(28),fill='white')
    d.text((x+58,408),a,font=font(18,True),fill=(245,252,253))
    d.text((x+58,436),b,font=font(12),fill=(134,199,211))
    x+=195

# url
d.rounded_rectangle((45,514,605,565),14,fill=(5,29,43),outline=(41,115,139),width=2)
d.text((62,527),'🌐  joaofaustinojr.github.io/Html/tangram-prof-junior-v12/',font=font(15,True),fill=(91,229,211))

# phone
phone=(655,28,1015,600)
d.rounded_rectangle(phone,44,fill=(24,34,40),outline=(116,137,147),width=4)
d.rounded_rectangle((671,44,999,584),34,fill=(5,21,32),outline=(22,82,105),width=2)
d.text((695,66),'🧩 Tangram Educativo',font=font(20,True),fill='white')
d.text((695,94),'Prof. João Faustino Junior • v13.1',font=font(11),fill=(163,204,214))
for i,t in enumerate(['⭐ XP','🏅 Lenda Tangram','📐 100%']):
    xx=690+i*98
    d.rounded_rectangle((xx,126,xx+88,154),13,fill=(10,43,59),outline=(47,101,122))
    d.text((xx+8,133),t,font=font(9,True),fill=(232,250,252))
d.rounded_rectangle((690,174,980,224),12,fill=(7,42,57),outline=(35,91,111))
d.text((704,187),'1. Quadrado Clássico — Fácil',font=font(13,True),fill=(129,241,220))
d.rounded_rectangle((702,232,968,242),5,fill=(8,42,50))
d.rounded_rectangle((702,232,968,242),5,fill=(52,227,190))

# tangram
bx,by,s=746,277,160
d.rectangle((bx,by,bx+s,by+s),fill=(238,246,248),outline='white',width=2)
d.polygon([(bx,by),(bx,by+s),(bx+s//2,by+s//2)],fill=(255,95,109))
d.polygon([(bx,by+s),(bx+s,by+s),(bx+s//2,by+s//2)],fill=(255,159,67))
d.polygon([(bx+s//2,by),(bx+s,by),(bx+s,by+s//2)],fill=(255,217,61))
d.polygon([(bx+40,by),(bx+112,by),(bx+138,by+34),(bx+66,by+34)],fill=(214,107,255))
d.polygon([(bx+65,by+34),(bx+115,by+34),(bx+90,by+64)],fill=(61,214,255))
d.polygon([(bx+s,by+s//2),(bx+s,by+s),(bx+110,by+120)],fill=(107,255,149))
d.polygon([(bx+95,by+65),(bx+138,by+108),(bx+95,by+151),(bx+52,by+108)],fill=(124,131,255))

# controls
labels=['↺ Girar','⇋ Espelhar','↻ Girar','💡 Dica','👁 Amostra','🔍 Ampliar','✓ Verificar']
for i,l in enumerate(labels):
    row=i//3; col=i%3
    xx=692+col*94; yy=463+row*43
    ww=84 if i<6 else 114
    if i==6: xx=692
    d.rounded_rectangle((xx,yy,xx+ww,yy+34),10,fill=(10,52,72) if i<6 else (8,136,159),outline=(47,107,129))
    d.text((xx+10,yy+10),l,font=font(9,True),fill='white')

# RAI mascot standing card from source, crop right/bottom-ish and frame
rai2=Image.open(RAI).convert('RGB')
crop=rai2.crop((0,0,rai2.width,rai2.height)).resize((190,190),Image.LANCZOS)
mask2=Image.new('L',(190,190),0); m2=ImageDraw.Draw(mask2); m2.rounded_rectangle((0,0,189,189),28,fill=255)
im.paste(crop,(996,345),mask2)
d.rounded_rectangle((994,343,1188,537),30,outline=(72,190,171),width=2)
d.rounded_rectangle((1000,275,1176,330),18,fill=(8,46,61),outline=(80,223,197),width=2)
d.text((1015,287),'R.A.I. Tutora',font=font(18,True),fill=(103,239,211))
d.text((1015,310),'dicas • formas • comemorações',font=font(10),fill=(176,221,229))

# footer
d.text((1006,558),'Instalável no celular',font=font(13,True),fill=(126,236,213))

OUT.parent.mkdir(parents=True,exist_ok=True)
im.save(OUT,'JPEG',quality=88,optimize=True,progressive=True)
print(OUT)
