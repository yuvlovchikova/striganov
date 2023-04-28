import React from 'react'
import emailjs from "@emailjs/browser"
import {
  useDisclosure,
  Input,
  Select,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text
} from '@chakra-ui/react'
import styles from "./services.module.css"

export default function Services({ services }) {
  const applicationModal = useDisclosure()
  const applicationModalRef = React.useRef(null)
  const descriptionModal = useDisclosure()
  const descriptionModalRef = React.useRef(null)
  const [service, setService] = React.useState(services[0])


  function buyService(e) {
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

  return <section id='services' className='pt4'>
    <h2 className="text_center">
      Ремонтные услуги
    </h2>

    <div className='grid_serv margin_top5 mb40'>
      {services.map(({ id, name, price }, i) =>
        <div key={id} className="flex_serv">
          <div className="pl_5">
            <h3>{name}</h3>
          </div>

          <VStack className="pl_5" align={"self-start"} spacing={"12px"}>
            <p>от {price} р.</p>
            <HStack spacing={"12px"}>
              <Button
                bgColor="black" color="white" className={"btn_description btn_fs "}
                onClick={() => {
                  setService(services[i])
                  descriptionModal.onOpen()
                }}>
                Подробнее
              </Button>
              <Button
                variant='outline' className={"  btn_application  btn_fs"} 
                onClick={() => {
                  setService(services[i])
                  applicationModal.onOpen()
                }}>
                Воспользоваться услугой
              </Button>
            </HStack>
          </VStack>
        </div>
      )}
    </div>

    {/* Модалка с формой для услуги */}
    <Modal
      finalFocusRef={applicationModalRef}
      isOpen={applicationModal.isOpen}
      onClose={applicationModal.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading textAlign={"center"}>
            Заявка на выполнение аутсорс-услуг
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={buyService}>
            <VStack spacing='24px'>
              <Text fontSize='md'>
                Введите ваши данные и мы свяжемся с вами в ближайшее время!
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
                <FormLabel>Выберите одну или несколько услуг, которыми хотите воспользоваться</FormLabel>
                <Select required name='service' defaultValue={service.name}>
                  {services.map(({ name }, i) =>
                    <option key={i}>{name}</option>)}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Опишите тип помещения, в котором нужны выбранные ремонтные услуги</FormLabel>
                <Input required name='type' type='text' placeholder='Коммерческое/жилое; тип коммерческого помещения: салон красоты, общепит и т.д.' />
              </FormControl>

              <Button colorScheme='green' type='submit'>
                Отправить заявку
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>

    {/* Модалка с описанием услуги */}
    <Modal
      finalFocusRef={descriptionModalRef}
      isOpen={descriptionModal.isOpen}
      onClose={descriptionModal.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading textAlign={"center"}>
            {service.name}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{service.description}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  </section>
}