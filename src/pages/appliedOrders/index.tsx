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

export const AppliedOrders = () => {
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
      const data = await getListOrder({page, limit, forProvider: true, onlyCandidate: true}).unwrap();
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

  const closeOrderDetails = (refresh?: boolean) => {
    setModalOpen(false);
    setOrderClicked(undefined);

    if(refresh) {
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
          <IonTitle>Serviços Aplicados</IonTitle>
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
            <ProfessionalOrderDetailsModal open={modalOpen} onClose={closeOrderDetails} orderId={orderClicked?.id} isApplied={true}/>
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
  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      textAlign: "center", justifyContent: "center",
    }}>
      <h3 style={{margin: 0, marginBottom: "12px"}}>Nenhum serviço para ser mostrado</h3>
    </div>
  );
};
