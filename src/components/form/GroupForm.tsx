import * as React from 'react';

import "./groupForm.css"
import {
    Typography,
    AppBar,
    Toolbar,
    TextField,
    Button,
    Box,
    TextareaAutosize,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Menu
  } from "@mui/material";  

  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';

  const options = [
    'Academico',
    'Deportivo',
    'Ocio',
    'Otro',
  ];



function GroupForm(){

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
        <div className="formGroup" style={{padding:"10px"}}>
      
      <form>
      <Typography variant="h5">CREACIÓN DE GRUPO</Typography>
      <br/>
        <TextField
          style={{ width: "100%", margin: "5px" }}
          type="text"
          label="Nombre del grupo"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: "100%", margin: "5px" }}
          type="text"
          label="Intereses"
          variant="outlined"
        />
        <br />
        <div style={{margin:"5px"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Fecha de creación"/>
        </LocalizationProvider>
        </div>
        <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Tipo de Grupo"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Tipo de grupo"
            secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
    <br/>
        <br/>
        <TextareaAutosize
          style={{ width: "100%", margin: "5px",height:"250px", fontFamily:"sans-serif",fontSize:"21px" }}          
          placeholder="  Descripción"
          
        />  
        <br/>     
        <Button variant="contained" color="primary">
          Crear Grupo
        </Button>
        <br/>
      </form>
    </div>
    )
}

export default GroupForm;