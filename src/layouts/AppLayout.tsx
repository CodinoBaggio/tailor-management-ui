import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import DownloadIcon from '@mui/icons-material/Download';
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/mdc-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import authUtils from '../features/auth/utils/authUtils';
import { setUser } from '../features/auth/stores/userSlice';
import { YesNoDialog } from '../components/ui/YesNoDialog';
import { setOrder, setUpdated } from '../features/order/stores/orderSlice';
import Loading from '../components/ui/Loading';

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.value);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // JWTを持っているのか確認する
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        setErrorMessage('セッションの有効期限が切れました。再度ログインしてください。');
        setTimeout(() => {
          handleLogout();
          // navigate('/login');
        }, 5000); // 5秒の遅延を追加
      } else {
        //ユーザーの保存
        dispatch(setUser(user));
        setLoading(false);
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    dispatch(setUser({}));
    dispatch(setOrder({}));

    // 表示更新フラグを設定する
    dispatch(setUpdated(true));

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

  const handleInvoice = () => {
    handleClose();
    navigate('/invoice');
  };

  return loading ? (
    <>
      <Loading />
    </>
  ) : (
    <>
      {errorMessage && <Box sx={{ color: 'red', textAlign: 'center', marginTop: 2 }}>{errorMessage}</Box>}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="h-12 justify-center">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              EN-ARQ
            </Typography>
            {import.meta.env.MODE !== 'prod' && (
              <Box className="text-xs">{`モード：${import.meta.env.MODE},VITE_PUBLIC_URL：${
                import.meta.env.VITE_PUBLIC_URL
              },VITE_API_URL：${import.meta.env.VITE_API_URL}`}</Box>
            )}
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
                <Box className="ml-2">ログイン情報</Box>
                {user.roleId === '00' && (
                  <Box className="ml-4">
                    <Typography>{`仲間分け：${user.shopGroup}`}</Typography>
                    <Typography>{`顧客カテゴリ：${user.shopNo}`}</Typography>
                  </Box>
                )}
                <Box className="ml-4 mb-2">
                  <Box>{`卸先様名：${user.shopName}`}</Box>
                  <Box>{`ユーザー名：${user.userName}`}</Box>
                </Box>
                <Divider />
                {user.roleId === '00' && (
                  <>
                    <MenuItem onClick={handleAdmin}>
                      <ListItemIcon>
                        <SecurityIcon />
                      </ListItemIcon>
                      <ListItemText>管理者メニュー</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleInvoice}>
                      <ListItemIcon>
                        <DownloadIcon />
                      </ListItemIcon>
                      <ListItemText>請求書データダウンロード</ListItemText>
                    </MenuItem>
                    <Divider />
                  </>
                )}
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
      <ConfirmDialog className="z-[100]" />
    </>
  );
};
