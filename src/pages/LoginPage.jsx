import {TextField} from "../components/TextField.jsx";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Checkbox,
  } from "@material-tailwind/react";
  import aquariumLogo from "../assets/aquariumLogo.svg";
   

export default function LoginPage() {
    return (
        <div className="h-screen bg-blue-gray-100 flex justify-center items-center ">
            <Card  className="flex items-center flex-col  w-80  ">
                <div className="mt-4"><img src={aquariumLogo} alt="My aquariumLogo" /></div>
                <CardBody className="flex flex-col pt-0 ">
                    <TextField placeholder={"Почта"}/>
                    <TextField placeholder={"Пароль"}/>
                    <div className="-ml-2.5 ">
                        <Checkbox color="blue" label="Запомнить меня" />
                     </div>
                </CardBody>
                <CardFooter className="pt-0 w-80" >
                    <Button   fullWidth color="blue">
                        Войти
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Нет аккаунта?
                    <Typography as="a" href="#зарегистрироваться" variant="small" color="blue-gray" className="ml-1 font-bold">
                        Зарегистрироваться
                    </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
            
    )

}