import { BellIcon, SettingsIcon } from "@chakra-ui/icons";
import { useAccount } from "../store/useAccount";
import { AccountData } from "./AccountData";
import { Navigate } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, CardFooter, Link } from "@nextui-org/react";

export const Main = () => {
  const { account, ClearAccount } = useAccount()
  return(
  <>
    { !account && <Navigate to='/setup'/>}
      <div className="grid">
        <Card className="p-3">
          <CardHeader className="flex justify-between justify-items-center gap-3">
              <div className="font font-bold text-2xl">
                Datos de la Cuenta
              </div>
              <div className="flex justify-center justify-items-center">
                {/* Notificaciones */}
                <Button isIconOnly className="bg bg-foreground-20"><BellIcon w={6} h={6}/></Button>  
                {/* Notificaciones */}
              </div>
          </CardHeader>
          <CardBody>
            <AccountData/>
          </CardBody>
          <CardFooter className="flex justify-between p-3">
              <Button as={Link} isIconOnly>
                <SettingsIcon/>
              </Button>
              <Button color="danger" onClick={ClearAccount}>
                Cerrar cuenta
              </Button> 
          </CardFooter>
        </Card>
       {/*<AddToken list={list} setList={setList} rpcUrl={url} publicKey={publicKey} />*/}
      </div>
    </>
  );
}