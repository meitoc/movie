import { useState } from 'react';

import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function ImageBox(prop) {
    const images=prop.images;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={handlePrevClick}>
        <ChevronLeft />
      </IconButton>

      <Box sx={{ flexGrow: 1 , display:"flex", justifyContent:"center", width: "100px", height: "300px"}}>
        <img src={images[currentIndex]} alt="" />
      </Box>

      <IconButton onClick={handleNextClick}>
        <ChevronRight />
      </IconButton>
    </Box>
  );
}