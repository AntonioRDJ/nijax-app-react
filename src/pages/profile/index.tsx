import { IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewDidLeave, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { LoadingComponent } from "../../components/loadingComponent";
import { useGlobal } from "../../contexts/GlobalContext";
import { Provider, User } from "../../services/user/types";
import { useLazyGetByUserIdQuery } from "../../services/user/user.service";
import { useAppSelector } from "../../store";
import { ServiceBR } from "../../utils/constants";


export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  const userId = useAppSelector(state => state.user.user?.id!);
  const [getUser] = useLazyGetByUserIdQuery();
  const { presentToast } = useGlobal();

  useIonViewWillEnter(async () => {
    try {
      setLoading(true);
      const userData = await getUser(userId).unwrap();
      setUser(userData.data.user);
    } catch (error) {
      presentToast({message: "Ocorreu um erro ao carregar os dados."})
    } finally {
      setLoading(false);
    }
  });

  useIonViewDidLeave(() => {
    setUser(undefined);
    setLoading(false);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="container">
            <>
              {user && <UserContent user={user} />}
              {user?.provider && <ProviderContent provider={user.provider} />}
            </>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

const UserContent = ({user}: {user: User}) => {

  return (
    <>
      <IonList style={{padding: "0 12px", overflow: "hidden"}}>
        <IonItem>
          <IonLabel position="floating">Nome</IonLabel>
          <IonInput
            type="text"
            value={user.name}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">E-mail</IonLabel>
          <IonInput
            type="text"
            value={user.email}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Celular</IonLabel>
          <IonInput
            type="text"
            value={user.cellphone}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Data de nascimento</IonLabel>
          <IonInput
            type="text"
            value={new Date(user.birthDate).toLocaleDateString()}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">CPF/CNPJ</IonLabel>
          <IonInput
            type="text"
            value={user.cpfCnpj}
            readonly={true}
          ></IonInput>
        </IonItem>
      </IonList>
    </>
  );
}

const ProviderContent = ({provider}: {provider: Provider}) => {
  
  return (
    <>
      <IonList style={{padding: "0 12px", overflow: "hidden"}}>
        <IonItem>
          <IonLabel position="floating">Nome Fantasia</IonLabel>
          <IonInput
            type="text"
            value={provider.fantasyName}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">CEP</IonLabel>
          <IonInput
            type="text"
            value={provider.cep}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Logradouro</IonLabel>
          <IonInput
            type="text"
            value={provider.street}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Número</IonLabel>
          <IonInput
            type="text"
            value={provider.number}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Bairro</IonLabel>
          <IonInput
            type="text"
            value={provider.district}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Cidade</IonLabel>
          <IonInput
            type="text"
            value={provider.city}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">UF</IonLabel>
          <IonInput
            type="text"
            value={provider.state}
            readonly={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Serviço prestado</IonLabel>
          <IonInput
            type="text"
            value={ServiceBR[provider.service]}
            readonly={true}
          ></IonInput>
        </IonItem>

        {Array.isArray(provider.experiences) && provider.experiences.length && (
          <IonItem>
            <h3>Experiências</h3>
            {provider.experiences.map(ex => (
              <div>
                <p><strong>Titulo: </strong>{ex.title}</p>
                <p><strong>Descrição: </strong>{ex.description}</p>
              </div>
            ))}
          </IonItem>
        )}

        {(Array.isArray(provider.formations) && provider.formations?.length)  && (
          <IonItem>
            <h3>Formações: </h3>
            {provider.formations.map(fo => (
              <div>
                <p><strong>Curso: </strong>{fo.course}</p>
                <p><strong>Instituição: </strong>{fo.institution}</p>
                <p>
                  <>
                    <strong>Início: </strong>{fo.startDate}
                  </>
                </p>
                <p>
                  <>
                    <strong>Término: </strong>{fo.endDate}
                  </>
                </p>
              </div>
            ))}
          </IonItem>
        )}

        {(Array.isArray(provider.socialNetworks) && provider.socialNetworks?.length) && (
          <IonItem>
            <h3>Redes Sociais: </h3>
            {provider.socialNetworks.map(sn => (
              <div>
                <p><strong>{sn.type}</strong>{sn.url}</p>
              </div>
            ))}
          </IonItem>
        )}
      </IonList>
    </>
  );
}
