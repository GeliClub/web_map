# Hough Line Transform - for line detection
import cv2
import numpy as np

name = 'test0'
ext = '.jpg'

img = cv2.imread('./assets/'+name+ext)
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray,50,150,apertureSize=3)

#cv2.imwrite('./output/'+name+'-gray'+ext,gray)
cv2.imwrite('./output/'+name+'-edge'+ext,edges)
# edges seems to be working from the outputs

# need to adjust the HoughLinesP parameters
# lines = cv2.HoughLinesP(image=edges,rho=0.02,theta=np.pi/500, threshold=10, minLineLength=10,maxLineGap=10)

# print(len(lines[0]))
# for x1,y1,x2,y2 in lines[0]:
#     cv2.line(img,(x1,y1),(x2,y2),(0,255,0),2)

# cv2.imwrite('./output/'+name+ext, img)


lines = cv2.HoughLinesP(image=edges,rho=0.1,theta=np.pi/500, threshold=20, minLineLength=100,maxLineGap=5)

a,b,c = lines.shape
for i in range(a):
    cv2.line(img, (lines[i][0][0], lines[i][0][1]), (lines[i][0][2], lines[i][0][3]), (0, 255, 0), 3, cv2.LINE_AA)

cv2.imwrite('./output/'+name+ext, img)
