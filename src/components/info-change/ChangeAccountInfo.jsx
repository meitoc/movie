import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { ContextStatus } from '../../App';


export default function ChangeAccountInfo(prop) {
    const {mobile} = React.useContext(ContextStatus);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    React.useEffect(()=>{
        if(prop.open===false) handleClose();
    },[prop.open])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: (mobile?280:400),
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
        <Button variant="outlined" onClick={handleOpen}>{prop.buttonName}</Button>
        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {prop.title}
                </Typography>
                {prop.note===null?"":<Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {prop.note}
                </Typography>}
                {prop.children}
            </Box>
        </Modal>
        </div>
    );
}