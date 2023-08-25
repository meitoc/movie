import * as React from 'react';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';

import { FacebookShareButton } from 'react-share';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ShareTo(prop) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const shareUrl = `https://movie.meitoc.net/movies/${prop.id}`; // URL bạn muốn chia sẻ
  const title = 'Let go to Meitoc Movie Information and create an account!';  
  return (
    <>
      <IconButton
          sx={{color: 'inherit' }}
          aria-label={`share ${prop.id}`}
          onClick={handleOpen}>
          <ShareIcon />
        </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="server-modal-title" variant="h6" component="h2">
            Share to:
        </Typography>
        
        <FacebookShareButton url={shareUrl} quote={title}>
          <Button
            variant="outlined"
            sx={{margin:2, width:270}}
          >
            Facebook
          </Button>
        </FacebookShareButton>
        </Box>
      </Modal>
    </>
  );
}