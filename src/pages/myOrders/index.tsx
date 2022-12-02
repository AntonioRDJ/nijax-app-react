import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonLoading, useIonViewDidLeave, useIonViewWillEnter } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { MyOrderDetailsModal } from "../../components/myOrderDetailsModal";
import { useGlobal } from "../../contexts/GlobalContext";
import { useLazyListOrdersQuery } from "../../services/order/order.service";
import { Order } from "../../services/order/types";
import { ServiceBR, StatusBR } from "../../utils/constants";
import debounce from "lodash.debounce";
import { LoadingComponent } from "../../components/loadingComponent";
import { CreateOrderModal } from "../../components/createOrderModal";

const limit = 15;

export const MyOrders = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderClicked, setOrderClicked] = useState<Order>();
  const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);

  const [present, dismiss] = useIonLoading();
  const [getListOrder] = useLazyListOrdersQuery();
  const { presentToast } = useGlobal();

  useIonViewWillEnter(() => {
    getListOrderRequestDebounce(1);
  });

  useIonViewDidLeave(() => {
    resetFields();
  });

  const resetFields = (refresh?: boolean) => {
    setPage(1);
    setOrders([]);
    setModalOpen(false);
    setOrderClicked(undefined);
    setIsInfiniteDisabled(false);
    setLoading(true);

    if(refresh) {
      getListOrderRequestDebounce(1);
    }
  }

  useEffect(() => {
    if(page > 1) {
      getListOrderRequestDebounce(page);
    }
  }, [page]);

  const getListOrderRequest = async (page: number) => {
    try {
      const data = await getListOrder({page, limit}).unwrap();
      setOrders(oldOrders => [...oldOrders, ...data]);
      setIsInfiniteDisabled(data.length < limit);
    } catch (error) {
      presentToast({message: "Ocorreu um erro ao carregar mais pedidos."});
    } finally {
      setLoading(false);
      dismiss();
    }
  };

  const getListOrderRequestDebounce = useCallback(debounce(getListOrderRequest, 500), []);


  const openOrderDetails = (order: Order) => {
    setOrderClicked(order);
    setModalOpen(true);
  };

  const closeOrderDetails = (refresh?: boolean) => {
    setModalOpen(false);
    setOrderClicked(undefined);
    
    if(refresh) {
      present({
        spinner: "crescent",
      });
      setOrders([]);
      setPage(1);
      getListOrderRequestDebounce(1);
    }
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
          <IonTitle>Meus Pedidos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        { loading ? (
          <LoadingComponent />
        ) : (
          <>
            <div style={{height: "100%"}}>
              { orders.length ? (
                <>
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
                </>
              ) : (
                <EmptyOrders />
              )}
            </div>
            <MyOrderDetailsModal open={modalOpen} onClose={closeOrderDetails} orderId={orderClicked?.id}/>
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

const EmptyOrders = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      textAlign: "center", justifyContent: "center",
    }}>
      <h3 style={{margin: 0, marginBottom: "12px"}}>Nenhum pedido para ser mostrado</h3>
      <h5 style={{margin: 0, fontWeight: "700"}} onClick={() => setModalOpen(true)}>Clique aqui para criar um novo</h5>

      <CreateOrderModal open={modalOpen} onClose={() => setModalOpen(false)}/>
    </div>
  );
};
