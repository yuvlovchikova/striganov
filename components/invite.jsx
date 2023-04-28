import React from 'react'
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Heading,
    Text,
    Button,
    VStack,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import emailjs from "@emailjs/browser"
import styles from "./invite.module.css"


export default function Invite() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)

    function sendContact(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const data = {}
        for (const iterator of formData.entries()) {
            data[iterator[0]] = iterator[1]
        }
        console.table(data)

        emailjs
            .send(
                "service_1wx8xjg",
                "template_cb70pai",
                data,
                "M-SfEALawXtRFQsfm"
            )
            .then((result) => console.log("result.text", result.text))
            .catch((error) => console.error("catch error.text", JSON.stringify(error)))
            .finally(() => console.log("finally"));
    }

    return (<section id='invite' className={styles.invite}>
        <hr className="hr2 margin_top15" />
        <h2 className={"  margin_top2 flex_center text_center"}>
            Присоединение дома к УО
        </h2>
        <h4 className={'flex_center text_center w70 m_auto'}>
            Мы обеспечиваем поддержание и улучшение жилищных условий вашего объекта, и для сотрудничества - свяжитесь с нами
        </h4>
        <Button colorScheme='green' onClick={onOpen} className={"button_invite flex m_auto  "}>
            Связаться
        </Button>
        <hr className="hr2 margin_top5 margin_bot15" />

        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Heading textAlign={"center"}>
                        Присоединение дома к услугам Управляющей Организации
                    </Heading>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={sendContact}>
                        <VStack spacing='24px'>
                            <Text fontSize='md'>
                                Оставьте ваши контакты, и мы с вами свяжемся в ближайшее время!
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
                                <FormLabel>Адрес вашего помещения</FormLabel>
                                <Input required name='address' type='text' placeholder='г. Нижний Тагил, ул. Красноармейская, д.66' />
                            </FormControl>


                            <FormControl>
                                <FormLabel>Тип вашего помещения</FormLabel>
                                <Input required name='type' type='text' placeholder='Коммерческое/жилое; тип коммерческого помещения: салон красоты, общепит и т.д.' />
                            </FormControl>

                            <Button colorScheme='green' type='submit'>
                                Отправить
                            </Button>
                        </VStack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    </section>)
}