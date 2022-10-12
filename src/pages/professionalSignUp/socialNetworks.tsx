import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { close } from "ionicons/icons";
import { SocialNetwork } from "../../services/user/types";
import { SocialNetworkEnum } from "../../utils/constants";
import { ExperienceBox } from "./styles";

type SocialNetworksProps = {
  socialNetworks: SocialNetwork[];
  setSocialNetworks: React.Dispatch<React.SetStateAction<SocialNetwork[]>>;
};

export const SocialNetworks = (props: SocialNetworksProps) => {
  const { socialNetworks, setSocialNetworks } = props;

  const createNewSocialNetwork = () => {
    setSocialNetworks(social => [...social, {
      id: (new Date().getTime()).toString(),
      url: "",
    }]);
  };

  const updateSocialNetwork = (toUpdate: SocialNetwork) => {
    setSocialNetworks(social => social.map(obj => {
      if(toUpdate.id === obj.id) {
        return toUpdate;
      }
      return obj;
    }));
  }

  const removeSocialNetwork = (toRemove: SocialNetwork) => {
    setSocialNetworks(social => social.filter(s => s.id !== toRemove.id));
  }
  
  return (
    <>
      <IonText>
        <h4>Redes Sociais</h4>
      </IonText>
      <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
        {socialNetworks.map(social => (
          <SocialNetworkComponent
            key={social.id}
            type={social.type}
            url={social.url}
            onChange={(value) => updateSocialNetwork({...social, type: value.type, url: value.url})}
            onClose={() => removeSocialNetwork(social)}
          />
        ))}
      </div>
      <IonButton onClick={createNewSocialNetwork} style={{marginTop: "8px"}}>Adicionar Rede Social</IonButton>
    </>
  );
};

type SocialNetworkProps = {
  type?: SocialNetworkEnum;
  url: string;
  onChange?: ({type, url}: {type?: SocialNetworkEnum, url: string}) => void;
  onClose?: () => void;
};

const SocialNetworkComponent = (props: SocialNetworkProps) => {
  const { type, url, onChange, onClose} = props;

  return (
    <ExperienceBox>
      <IonItem>
        <IonLabel position="floating">Rede Social</IonLabel>
        <IonSelect placeholder="Selecione" value={type} onIonChange={(e) => onChange && onChange({type: e.detail.value!, url})}>
          {Object.entries(SocialNetworkEnum).map(([key, value]) => (
            <IonSelectOption value={key}>{value}</IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel>Link:</IonLabel>
        <IonInput
          type="text"
          value={url}
          onIonChange={(e) => onChange && onChange({url: e.detail.value!, type})}
        ></IonInput>
      </IonItem>
      <IonButton fill="clear" shape="round" size="small" style={{position: "absolute", right: "0", top: "0", zIndex: "1"}} onClick={onClose}>
        <IonIcon slot="icon-only" icon={close}></IonIcon>
      </IonButton>
    </ExperienceBox>
  );
};