# image countour 
import cv2
import numpy as np

name = 'test0'
ext = '.jpg'

img = cv2.imread('./assets/'+name+ext)
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
ret, thresh = cv2.threshold(gray, 127, 255, 0)
image, contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

img = cv2.drawContours(img, contours, -1, (0,255,0), 3)

cv2.imwrite('./output/'+name+'-contour'+ext, img)