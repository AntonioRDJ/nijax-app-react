import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton , IonIcon, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonCard, IonCardHeader, IonCardTitle, IonSelect, IonSelectOption, useIonLoading, IonRange } from "@ionic/react";
import { arrowBackOutline, checkmark, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { useLazyGetOrderQuery, useUpdateOrderMutation } from "../../services/order/order.service";
import { Candidacy, CandidacyProvider, Order } from "../../services/order/types";
import { useLazyGetAddressQuery } from "../../services/viacep/viacep.service";
import { ServiceBR, StatusBR } from "../../utils/constants";
import { validateCep } from "../../utils/validations";
import { LoadingComponent } from "../loadingComponent";
import { ProfessionalDetailsModal } from "../professionalDetailsModal";

const requiredFields = ["status", "title", "description", "service", "cep", "number", "street", "district", "distance"];

type MyOrderDetailsModalProps = {
  orderId?: string;
  open: boolean;
  onClose: () => void;
};

export const MyOrderDetailsModal = (props: MyOrderDetailsModalProps) => {
  const { orderId, open, onClose } = props;
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order>();
  const [orderEdit, setOrderEdit] = useState<Order>();
  const [isEditing, setIsEditing] = useState(false);

  const { presentToast } = useGlobal();
  const [present, dismiss] = useIonLoading();
  const [getOrder] = useLazyGetOrderQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const [getAddress] = useLazyGetAddressQuery();

  useEffect(() => {
    if(!orderId) {
      resetFields();
      return;
    }
    requestGetOrder(orderId);
  }, [orderId]);

  const requestGetOrder = async (orderId: string) => {
    try {
      setLoading(true);
      const order = await getOrder(orderId).unwrap();
      setOrder(order);
      setOrderEdit(order);
    } catch (error) {
      presentToast({message: "Ocorreu um erro ao carregar os dados."})
    } finally {
      setLoading(false);
    }
  }

  const resetFields = () => {
    setOrder(undefined);
    setOrderEdit(undefined);
    setLoading(false);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    let orderToCreate = {
      status: orderEdit?.status,
      title: orderEdit?.title,
      description: orderEdit?.description,
      service: orderEdit?.service,
      cep: orderEdit?.cep,
      number: orderEdit?.number,
      street: orderEdit?.street,
      district: orderEdit?.district,
      distance: orderEdit?.distance,
    };
    if(requiredFields.some(key => !orderToCreate[key as keyof typeof orderToCreate])) {
      presentToast({message: "Por favor preencha todos os campos."});
      return;
    }

    if(JSON.stringify(order) ==  JSON.stringify(orderEdit)) {
      setIsEditing(false);
      return;
    }

    try {
      present({
        spinner: "crescent",
      });
      const { data } = await updateOrder(orderEdit!).unwrap();
      setIsEditing(false);
      presentToast({message: "Alterações realizadas com sucesso.", color: "success"});
    } catch (error) {
      presentToast({message: "Ocorreu um erro, tente novamente mais tarde."});
    } finally {
      dismiss();
    }
  }

  const handleChangeOrderEdit = (field: keyof Order, value: any) => {
    setOrderEdit((oldOrder) => ({
      ...oldOrder as Order,
      [field]: value,
    }));
  }

  const handleBlurCep = async (cep?: string) => {
    if(!validateCep(cep)) {
      return
    }
    try {
      const data = await getAddress(cep!).unwrap();

      if(data.erro) {
        return presentToast({message: "Cep não encontrado.", color: "warning"});
      }
      setOrderEdit((oldOrder) => ({
        ...oldOrder as Order,
        cep: data.cep,
        street: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        state: data.uf,
      }));
      
    } catch (error) {
      presentToast({message: "Erro ao recuperar dados do cep informado.", color: "danger"});
    }
  }

  return (
    <IonModal isOpen={open}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            {isEditing ? (
              <IonButton onClick={handleSaveEdit}>
                <IonIcon slot="icon-only" icon={checkmark}></IonIcon>
              </IonButton>
            ) : (
              <IonButton onClick={() => setIsEditing(true)}>
                <IonIcon slot="icon-only" icon={pencil}></IonIcon>
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>Detalhes do Pedido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ?  (
          <LoadingComponent />
          ) : (
          <>
            {orderEdit && <Content order={orderEdit} isEditing={isEditing} onChange={handleChangeOrderEdit} onBlurCep={handleBlurCep}/> }
          </>
        )}
      </IonContent>
    </IonModal>
  );
}

type ContentProps = {
  order: Order;
  isEditing: boolean;
  onChange: (field: keyof Order, value: any) => void;
  onBlurCep: (cep: string) => void;
}

const Content = (props: ContentProps) => {
  const { order, isEditing, onChange, onBlurCep } = props;
  const [providerSelected, setProviderSelected] = useState<CandidacyProvider>();
  const [openProfessionalModal, setOpenProfessionalModal] = useState(false);

  const handleOpenProfessionalModal = (provider: CandidacyProvider) => {
    setProviderSelected(provider);
    setOpenProfessionalModal(true);
  }

  const handleCloseProfessionalModal = () => {
    setOpenProfessionalModal(false);
    setProviderSelected(undefined);
  }

  return (
    <>
      <IonList style={{padding: "0 12px", overflow: "hidden"}}>
        <IonItem>
          <IonLabel position="floating">Status</IonLabel>
          <IonSelect placeholder="Selecione" value={order?.status} onIonChange={(e) => onChange("status", e.detail.value)} disabled={!isEditing}>
            {Object.entries(StatusBR).map(([key, value]) => (
              <IonSelectOption key={key} value={key}>{value}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Título</IonLabel>
          <IonInput
            type="text"
            value={order?.title}
            readonly={!isEditing}
            onIonChange={(e) => onChange("title", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Descrição</IonLabel>
          <IonTextarea
            value={order?.description}
            readonly={!isEditing}
            autoGrow={true}
            onIonChange={(e) => onChange("description", e.detail.value!)}
          ></IonTextarea>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Tipo de serviço</IonLabel>
          <IonSelect placeholder="Selecione" value={order?.service} onIonChange={(e) => onChange("service", e.detail.value)} disabled={!isEditing}>
            {Object.entries(ServiceBR).map(([key, value]) => (
              <IonSelectOption key={key} value={key}>{value}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">CEP</IonLabel>
          <IonInput
            type="text"
            value={order?.cep}
            readonly={!isEditing}
            onIonChange={(e) => onChange("cep", e.detail.value!)}
            onIonBlur={() => onBlurCep(order.cep)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Logradouro</IonLabel>
          <IonInput
            type="text"
            value={order?.street}
            readonly={!isEditing}
            onIonChange={(e) => onChange("street", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Número</IonLabel>
          <IonInput
            type="text"
            value={order?.number}
            readonly={!isEditing}
            onIonChange={(e) => onChange("number", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Bairro</IonLabel>
          <IonInput
            type="text"
            value={order?.district}
            readonly={!isEditing}
            onIonChange={(e) => onChange("district", e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Cidade</IonLabel>
          <IonInput
            type="text"
            value={order?.city}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">UF</IonLabel>
          <IonInput
            type="text"
            value={order?.state}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Raio de procura (km)</IonLabel>
          <IonRange
            debounce={50}
            min={1}
            max={150}
            value={order?.distance}
            onIonChange={({ detail }) => onChange("distance", detail.value! as number)}
            pin={true}
            disabled={!isEditing}
          ></IonRange>
        </IonItem>
      </IonList>

      {!isEditing && (
        <CandidateList candidates={order!.candidacy ?? []} onClickCandidate={handleOpenProfessionalModal}/>
      )}

      <ProfessionalDetailsModal provider={providerSelected} open={openProfessionalModal} onClose={handleCloseProfessionalModal}/>
    </>
  );
};

type CandidateListProps = {
  candidates: Candidacy[];
  onClickCandidate: (provider: CandidacyProvider) => void;
}

export const CandidateList = (props: CandidateListProps) => {
  const { candidates, onClickCandidate } = props;

  return (
    <div style={{padding: "0 12px", marginTop: "24px"}}>
      <h4>Candidados ao pedido</h4>
      <div style={{display: "flex", flexDirection: "column"}}>
        {candidates.map(candidate => (
          <IonCard key={candidate.provider.id} onClick={() => onClickCandidate(candidate.provider)}>
            <IonCardHeader>
              <IonCardTitle>{candidate.provider.fantasyName || candidate.provider.user?.name}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        ))}
      </div>
    </div>
  );
}
