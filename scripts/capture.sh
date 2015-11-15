#!/bin/bash

X=$1
Y=$2
FILE_NAME=$3

#convert \
#  -size ${Y}x${X} \
#  xc: +noise Random \
#  -background none \
#  -fill white \
#  -strokewidth 2 \
#  -stroke white \
#  -font Helvetica \
#  -density 96 \
#  -pointsize 56 \
#  label:"$FILE_NAME" \
#  "$FILE_NAME"

convert -size ${X}X${Y} xc: +noise Random   \( +clone -transpose \) \
        \( +clone -sparse-color voronoi '%w,0 white 0,%h black' \) \
        -composite \
        \( +clone -flop -chop 1x0 \) +append \
        \( +clone -flip -chop 0x1 \) -append \
        -chop 1x1 \
        \
        -virtual-pixel Tile -blur 0x5 -auto-level \
        -separate -background white \
        -compose Add -flatten -channel R -combine +channel \
        -set colorspace HSB -colorspace RGB "$FILE_NAME"
