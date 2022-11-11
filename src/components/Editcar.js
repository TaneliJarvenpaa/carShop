import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Editcar({updateCar, params}) {
   const [open, setOpen] = React.useState(false);
   const [car, setCar] = React.useState({
      brand: '', model: '', color: '', fuel: '', year: '', price: ''
   })

   const handleClickOpen = () => {
     
     setCar({brand: params.data.brand, model: params.data.model, color: params.data.color, 
      fuel: params.data.fuel, year: params.data.year, price: params.data.price})
     setOpen(true);
   };
 
   
   const handleClose = () => {
     setOpen(false);
   };

   const handleInputChange = (e) => {
      setCar({...car, [e.target.name]: e.target.value})
   };

   const updateCars = (params) => {
      updateCar(car, params.value); 
      handleClose();
   }
   
   return(
      <div>
         <Button onClick={handleClickOpen} style={{margin: 10}} variant="outlined">
            Edit  car
         </Button>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit car</DialogTitle>
               <DialogContent>
                  <TextField
                     autoFocus
                     margin="dense"
                     name="brand"
                     value={car.brand}
                     onChange={e => handleInputChange(e)}
                     label="brand"
                     fullWidth
                     variant="standard"
                  />
                  <TextField
                     margin="dense"
                     name="model"
                     value={car.model}
                     onChange={e => handleInputChange(e)}
                     label="model"
                     fullWidth
                     variant="standard"
                  />
                   <TextField
                     margin="dense"
                     name="color"
                     value={car.color}
                     onChange={e => handleInputChange(e)}
                     label="color"
                     fullWidth
                     variant="standard"
                  />
                  <TextField
                     margin="dense"
                     name="fuel"
                     value={car.fuel}
                     onChange={e => handleInputChange(e)}
                     label="fuel"
                     fullWidth
                     variant="standard"
                  />
                  <TextField
                     margin="dense"
                     name="year"
                     value={car.year}
                     onChange={e => handleInputChange(e)}
                     label="year"
                     fullWidth
                     variant="standard"
                  />
                  <TextField
                     margin="dense"
                     name="price"
                     value={car.price}
                     onChange={e => handleInputChange(e)}
                     label="price"
                     fullWidth
                     variant="standard"
                  />
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={updateCars}>Save</Button>
               </DialogActions>
         </Dialog>
      </div>
   )
}
