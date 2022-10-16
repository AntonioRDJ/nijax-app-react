import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { exitOutline, homeOutline, personOutline, readerOutline } from 'ionicons/icons';
import './styles.module.css';
import { useAppDispatch, useAppSelector } from '../../store';
import { BoxContent } from './styles';
import { logout } from '../../store/reducers/User/slice';

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const disabledPages = [
  "/login",
  "/signup"
];

const appPages: AppPage[] = [
  {
    title: 'Perfil',
    url: '/app/profile',
    icon: personOutline,
  },
  {
    title: 'Pedidos',
    url: '/app/orders',
    icon: readerOutline,
  },
  {
    title: 'Home',
    url: '/app/home',
    icon: homeOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const userName = useAppSelector(state => state.user.nameToDisplay);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logout());
  }

  return (
    <IonMenu contentId="main" type="overlay" disabled={disabledPages.includes(location.pathname)}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <BoxContent>
          <IonList id="inbox-list">
            <IonListHeader>
              <IonText>
                Olá <strong>{userName}</strong>
              </IonText>
            </IonListHeader>
            {/* <IonNote>hi@ionicframework.com</IonNote> */}
            {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" icon={appPage.icon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>

          <IonList id="bottom-box">
            <IonMenuToggle autoHide={false}>
              <IonItem lines="none" onClick={handleLogout}>
                <IonIcon slot="start" icon={exitOutline} />
                <IonLabel>Sair</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </BoxContent>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
