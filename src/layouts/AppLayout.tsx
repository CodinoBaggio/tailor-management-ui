import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';

import authUtils from '../features/auth/utils/authUtils';
import { setUser } from '../features/auth/stores/userSlice';
import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { YesNoDialog } from '../components/ui/YesNoDialog';

export const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.value);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // JWTを持っているのか確認する
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/login');
      } else {
        dispatch(setUser(user));
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setUser({}));
    navigate('/login');
  };

  const [yesNoDialogOpen, setYesNoDialogOpen] = useState(false);
  const [yesNoDialogMessage, setYesNoDialogMessage] = useState('');
  const onNoClick = () => {
    setYesNoDialogOpen(false);
  };
  const onYesClick = (action: any) => {
    action();
    setYesNoDialogOpen(false);
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdmin = () => {
    handleClose();
    navigate('/admin');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="h-12 justify-center">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ロゴ
            </Typography>
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user.roleId === '00' && (
                  <MenuItem>
                    <Typography>
                      {`${user.shopGroup} ${user.shopNo}`}
                    </Typography>
                  </MenuItem>
                )}
                <MenuItem>
                  <Typography>
                    <Box>{user.shopName}</Box>
                    <Box>{`${user.userName}様`}</Box>
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleAdmin}>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText>管理者メニュー</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setYesNoDialogMessage('ログアウトしますか？');
                    setYesNoDialogOpen(true);
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText>ログアウト</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <Outlet />
      </Container>
      <YesNoDialog
        open={yesNoDialogOpen}
        message={yesNoDialogMessage}
        onNoClick={onNoClick}
        onYesClick={() => onYesClick(handleLogout)}
      />
    </>
  );
};
