import cv2
import numpy as np
#from matplotlib import pyplot as plt

#name = 'blackandwhite'
name = 'test0'
ext = '.jpg'

img = cv2.imread('./assets/'+name+ext,0)

laplacian64 = cv2.Laplacian(img,cv2.CV_64F)
sobelx64 = cv2.Sobel(img,cv2.CV_64F,1,0,ksize=5)
sobely64 = cv2.Sobel(img,cv2.CV_64F,0,1,ksize=5)

laplacian = np.uint8(np.absolute(laplacian64))
sobelx = np.uint8(np.absolute(sobelx64))
sobely = np.uint8(np.absolute(sobely64))

joint = cv2.addWeighted(sobelx, 1, sobely, 1, 0)

cv2.imwrite('./output/'+name+'-laplacian'+ext, laplacian)
cv2.imwrite('./output/'+name+'-sobelx'+ext, sobelx)
cv2.imwrite('./output/'+name+'-sobely'+ext, sobely)
cv2.imwrite('./output/'+name+'-joint'+ext, joint)

# plt.subplot(2,2,1),plt.imshow(img,cmap = 'gray')
# plt.title('Original'), plt.xticks([]), plt.yticks([])
# plt.subplot(2,2,2),plt.imshow(laplacian,cmap = 'gray')
# plt.title('Laplacian'), plt.xticks([]), plt.yticks([])
# plt.subplot(2,2,3),plt.imshow(sobelx,cmap = 'gray')
# plt.title('Sobel X'), plt.xticks([]), plt.yticks([])
# plt.subplot(2,2,4),plt.imshow(sobely,cmap = 'gray')
# plt.title('Sobel Y'), plt.xticks([]), plt.yticks([])
# plt.show()