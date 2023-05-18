import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CheckboxList from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

export default function Checkbox() {
  const [checked, setChecked] = React.useState([0]);

  const reportType = ['error', 'grupo','usuario'];

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {reportType.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <CheckboxList
                edge="end"
                onChange={handleToggle(reportType.indexOf(value))}
                checked={checked.indexOf(reportType.indexOf(value)) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >

 
              <ListItemText id={labelId} primary={`Reportar `+ value} />

          </ListItem>
        );
      })}
    </List>
  );
}