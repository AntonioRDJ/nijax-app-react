import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewDidLeave, useIonViewWillEnter } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { useLazyListOrdersQuery } from "../../services/order/order.service";
import { Order } from "../../services/order/types";
import { ServiceBR, StatusBR } from "../../utils/constants";
import debounce from "lodash.debounce";
import { LoadingComponent } from "../../components/loadingComponent";
import { useAppSelector } from "../../store";
import { ProfessionalOrderDetailsModal } from "../../components/professionalOrderDetailsModal";

const limit = 15;

export const FindOrders = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderClicked, setOrderClicked] = useState<Order>();
  const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);

  const providerService = useAppSelector(state => state.user.service!);
  const [getListOrder] = useLazyListOrdersQuery();
  const { presentToast } = useGlobal();

  useIonViewWillEnter(() => {
    getListOrderRequestDebounce(1);
  });

  useIonViewDidLeave(() => {
    setPage(1);
    setOrders([]);
    setModalOpen(false);
    setOrderClicked(undefined);
    setIsInfiniteDisabled(false);
    setLoading(true);
  });

  useEffect(() => {
    if(page > 1) {
      getListOrderRequestDebounce(page);
    }
  }, [page]);

  const getListOrderRequest = async (page: number) => {
    try {
      const data = await getListOrder({page, limit, service: providerService, forProvider: true}).unwrap();
      setOrders(oldOrders => [...oldOrders, ...data]);
      setIsInfiniteDisabled(data.length < limit);
    } catch (error) {
      presentToast({message: "Ocorreu um erro ao carregar mais pedidos."});
    } finally {
      setLoading(false);
    }
  };

  const getListOrderRequestDebounce = useCallback(debounce(getListOrderRequest, 500), []);


  const openOrderDetails = (order: Order) => {
    setOrderClicked(order);
    setModalOpen(true);
  };

  const closeOrderDetails = () => {
    setModalOpen(false);
    setOrderClicked(undefined);
  };

  const handleInfiniteScroll = async (ev: any) => {
    setPage((oldPage) => oldPage + 1);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Encontrar Serviços</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        { loading ? (
          <LoadingComponent />
        ) : (
          <>
            <div className="container">
              { orders?.map(order => (
                <IonCard key={order.id} onClick={() => openOrderDetails(order)}>
                  <IonCardHeader>
                    <IonCardSubtitle>{StatusBR[order.status]}</IonCardSubtitle>
                    <IonCardTitle>{order.title}</IonCardTitle>
                    <IonCardSubtitle>{ServiceBR[order.service]}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>Endereço: {order.street}, {order.number} - {order.district}, {order.city}</p>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
            <ProfessionalOrderDetailsModal open={modalOpen} onClose={closeOrderDetails} orderId={orderClicked?.id}/>
            <IonInfiniteScroll
              onIonInfinite={handleInfiniteScroll}
              threshold="100px"
              disabled={isInfiniteDisabled}
            >
              <IonInfiniteScrollContent
                loadingSpinner="crescent"
                loadingText="Carregando..."
              ></IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};
