import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import TopicsIcon from '@mui/icons-material/Interests';
import DateIcon from '@mui/icons-material/DateRange';
import NameIcon from '@mui/icons-material/Badge';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import "./filters.css"

export default function Filters(props:any) {
  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };

  function onFilterChange(event:any){

    console.log(event.target.innerText);
    props.filterValueSelected(event.target.innerText);

  }


  return (
    <List className='filterMargin'
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mr:'30%' }}
      component="nav"
      aria-labelledby="nested-list-subheader" 
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Filtros
        </ListSubheader>
      }
    >

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <TopicsIcon />
        </ListItemIcon>
        <ListItemText primary="Temas de interés" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={onFilterChange} id="all">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="todos" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={onFilterChange} id="arduino">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="arduino" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={onFilterChange} id="ingeniería">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="ingeniería" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={onFilterChange} id="matematicas">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="matematicas" />
          </ListItemButton>
        </List>
      </Collapse>



      <ListItemButton onClick={handleClick2}>
        <ListItemIcon>
          <DateIcon />
        </ListItemIcon>
        <ListItemText primary="Fecha de creación" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={onFilterChange} id="recientes - antiguos">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="recientes - antiguos" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={onFilterChange} id="antiguos - recientes">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="antiguos - recientes" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={onFilterChange} id="restablecer">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="restablecer" />
          </ListItemButton>
          
        </List>
      </Collapse>


      <ListItemButton onClick={handleClick3}>
        <ListItemIcon>
          <NameIcon />
        </ListItemIcon>
        <ListItemText primary="Nombre" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={onFilterChange} id="A - Z">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="A - Z" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={onFilterChange} id="Z - A">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Z - A" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }} onClick={onFilterChange} id="restablecer">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="restablecer" />
          </ListItemButton>
          
        </List>
      </Collapse>


    </List>
  );
}

