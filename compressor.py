from PIL import Image

foo = Image.open("images/image.jpg")
 # I downsize the image with an ANTIALIAS filter (gives the highest quality)
foo = foo.resize((500,500),Image.ANTIALIAS)
foo.save("images/image.jpg",optimize=True,quality=70)
