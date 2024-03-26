import { Box, Divider, Button, Text, Stack } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { useAccount } from "../store/useAccount";
import { AccountData } from "../components/AccountData";

type Props = {
    publicKey: string
}
export const Main : React.FC<Props> = ({publicKey}) => {
    const { ClearAccount } = useAccount()
    return(
        <>
            <Box display="flex" justifyContent="center" width="100%"
                maxWidth="600px" borderWidth="1px" p={6}>
                <Stack width="100%" maxWidth="600px" justifyContent="center">
                  {/*Datos de la cuenta*/}
                  <AccountData />
                  {/*Transferencias */}
                  {/*Balance */}

                  <Divider my={10}/>
                  {/*<AddToken list={list} setList={setList} rpcUrl={url} publicKey={publicKey} />*/}
                  <Divider my={10}/>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button //onClick={onConfig}
                    ><SettingsIcon/></Button>
                    <Text textAlign="center"> </Text>
                    <Button variant="outline" color="red"
                    onClick={ClearAccount}>Cerrar cuenta</Button>
                  </Box>
                </Stack>
            </Box>
        </>
    );
}