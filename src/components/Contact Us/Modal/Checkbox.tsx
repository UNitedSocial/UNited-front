import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CheckboxList from '@mui/material/Checkbox';

export default function Checkbox(props: any) {

    const {handleToggle, checked, reportType} = props;

    return (
        <List dense sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {reportType.map((value: any) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    <ListItem
                        key={value}
                        secondaryAction={
                            <CheckboxList
                                edge="end"
                                onChange={handleToggle(reportType.indexOf(value))}
                                checked={checked.indexOf(reportType.indexOf(value)) !== -1}
                                inputProps={{'aria-labelledby': labelId}}
                            />
                        }
                        disablePadding
                    >


                        <ListItemText id={labelId} primary={`Reportar ` + value}/>

                    </ListItem>
                );
            })}
        </List>
    );
}
