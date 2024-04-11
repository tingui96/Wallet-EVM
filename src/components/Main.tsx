import { SettingsIcon } from "@chakra-ui/icons";
import { useAccount } from "../store/useAccount";
import { AccountData } from "./AccountData";
import { Navigate } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, CardFooter, Link, Spinner } from "@nextui-org/react";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { FooterPending } from "./FooterPending";
import { usePending } from "../store/usePending";
import { useRPC } from "../store/useRPC";

export const Main = () => {
  const { account, ClearAccount } = useAccount()
  const { ClearRPC } = useRPC()
  const {pending} = usePending()
  const onCloseAll = () => {
    ClearAccount()
    ClearRPC()
  }
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
                <Button className="rounded-full bg-gradient-to-tr from-violet-700 to-cyan-500 text-white" as={Link} href="/setting" isIconOnly>
                  <SettingsIcon/>
                </Button>
                {/* Notificaciones */}
              </div>
          </CardHeader>
          <CardBody>
            <AccountData/>
          </CardBody>
          <CardFooter className="flex justify-end p-3">
              
              <Button isIconOnly className="bg-gradient-to-tr from-orange-500 to-red-500 text-white text-tiny" 
                  onClick={onCloseAll}>
                <CancelPresentationIcon/>
              </Button> 
          </CardFooter>
        </Card>
      </div>
      { pending &&
        <FooterPending> 
          <p className='text text-sm font-bold'>Transferencia</p>
          <p className='text text-sm font-bold'>Pendiente</p><Spinner size='sm'/>
        </FooterPending>}
    </>
  );
}