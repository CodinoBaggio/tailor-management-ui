import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

type Props = {
  tabItems: { label: string; component: React.ReactNode }[];
};

export const VerticalTabs: FC<Props> = (props) => {
  const { tabItems } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className='flex h-screen'>
      <Tabs
        orientation='vertical'
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        {tabItems.map((item, index) => {
          return <Tab label={item.label} {...a11yProps(index)} />;
        })}
      </Tabs>
      <Divider orientation='vertical' flexItem />
      {tabItems.map((item, index) => {
        return (
          <TabPanel value={value} index={index}>
            <Box>{item.component}</Box>
          </TabPanel>
        );
      })}
    </Box>
  );
};
