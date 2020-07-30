import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 280,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  TextField: {
    marginRight: theme.spacing(12),
    width: '15ch',
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title">Комментарии к задаче:</h3>
     
      <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          rows={4}
          defaultValue="Необходимо пересмотреть данный этап в плане,
          добавить подробное описание..."
          variant="outlined"
        /> 
      
      <Button onClick={handleClose}>Закрыть</Button>
      <Button onClick={handleClose}>Сохранить</Button>
    </div>
  );

  return (
    <div>
      <Button onClick={handleOpen}>
      <RateReviewOutlinedIcon/>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
