import React from 'react'
import emailjs from "@emailjs/browser"
import { StructuredText } from "react-datocms"
import {
  useDisclosure,
  Input,
  Select,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text
} from '@chakra-ui/react'
import styles from "./positions.module.css"


export default function Positions({ positions }) {
  const applicationModal = useDisclosure()
  const applicationModalRef = React.useRef(null)
  const descriptionModal = useDisclosure()
  const descriptionModalRef = React.useRef(null)
  const [position, setPosition] = React.useState(positions[0])

  function sendPosition(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = {}
    for (const iterator of formData.entries()) {
      data[iterator[0]] = iterator[1]
    }
    console.table(data)

    emailjs
      .send(
        "service_5gp70sw",
        "template_5e9u4br",
        data,
        "SpsVCVqIt73f60qTS"
      )
      .then((result) => console.log("result.text", result.text))
      .catch((error) => console.error("catch error.text", JSON.stringify(error)))
      .finally(() => console.log("finally"));
  }

  return <section id='positions'>
    <h2 className="text_center">
      Открытые вакансии
    </h2>

    <div className='grid_serv margin_top5'>
      {positions.map(({ positionSlug, positionName }, i) =>
        <div key={positionSlug} className="flex_serv">
          <div className="pl_5">
            <h3>{positionName}</h3>
          </div>
          <div className={"pl_5 margin_bot15 "}>
            <HStack spacing={"12px"} className={"margin_top5_mob "}>
              <Button
                bgColor="black" color="white" className={"btn_fs btn_description"}
                onClick={() => {
                  setPosition(positions[i])
                  descriptionModal.onOpen()
                }}>
                Подробнее
              </Button>
              <Button
                variant='outline' className={"btn_application btn_fs"}
                onClick={applicationModal.onOpen} >
                Откликнуться на вакансию
              </Button>
            </HStack>
          </div>
        </div>)}
    </div>


    {/* Модалка с подачей на вакансию */}
    <Modal
      finalFocusRef={applicationModalRef}
      isOpen={applicationModal.isOpen}
      onClose={applicationModal.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading textAlign={"center"}>
            Отклик на вакансию
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={sendPosition}>
            <VStack spacing='24px'>
              <Text fontSize='md'>
                Заполните поля, и мы с вами свяжемся!
              </Text>

              <FormControl>
                <FormLabel>Ваш email</FormLabel>
                <Input required name='email' type='email' placeholder='example@gmail.com' />
              </FormControl>

              <FormControl>
                <FormLabel>Ваше имя</FormLabel>
                <Input required name='name' type='text' placeholder='Например, Максим Сергеевич' />
              </FormControl>

              <FormControl>
                <FormLabel>Ваш телефон</FormLabel>
                <Input required name='phone' type='tel' placeholder='+7 (999) 999-99-99' />
              </FormControl>

              <FormControl>
                <FormLabel>Ваш возраст</FormLabel>
                <Input required name='age' type='number' placeholder='Введите число' />
              </FormControl>

              <FormControl>
                <FormLabel>Выберите интересующую вас вакансию</FormLabel>
                <Select required name='vacancy' placeholder='Выберите вакансию'>
                  {positions.map(({ positionSlug, positionName }) =>
                    <option key={positionSlug}>{positionName}</option>)}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Опишите ваш опыт работы</FormLabel>
                <Textarea required name='experience' placeholder='Был ли у вас опыт работы в указанной сфере, сколько лет, где, какие функции вы выполняли. Расскажите про ваш опыт работы в других сферах, если он имеется' />
              </FormControl>

              <FormControl>
                <FormLabel>Ваше образования</FormLabel>
                <Textarea required name='education' placeholder='Среднее, высшее (по каким специальностям, год окончания)/отсутствует' />
              </FormControl>

              <Button colorScheme='green' type='submit'>
                Отправить резюме
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>

    {/* Модалка с описанием вакансии */}
    <Modal
      finalFocusRef={descriptionModalRef}
      isOpen={descriptionModal.isOpen}
      onClose={descriptionModal.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading textAlign={"center"}>
            {position.positionName}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StructuredText data={position.positionDescription} />
        </ModalBody>
      </ModalContent>
    </Modal>
  </section>
}
