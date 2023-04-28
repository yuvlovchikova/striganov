import React from 'react'
import { getAddresses } from "@/lib/datocms"
import styles from "./cabinet.module.css"
import emailjs from "@emailjs/browser";
import {
  Input,
  InputGroup,
  Select,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Button,
  Textarea
} from '@chakra-ui/react'

const Cabinet = ({ address }) => {

  function sendApplication(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = {}
    for (const iterator of formData.entries()) {
      data[iterator[0]] = iterator[1]
    }
    console.table(data)
    // TODO: валидация через Firebase

    emailjs
      .send(
        "service_1wx8xjg",
        "template_yc6pyon",
        data,
        "M-SfEALawXtRFQsfm"
      )
      .then((result) => console.log("result.text", result.text))
      .catch((error) => console.error("catch error.text", JSON.stringify(error)))
      .finally(() => console.log("finally"));
  }

  return <main className={styles.main}>

    <form onSubmit={sendApplication}>
      <VStack spacing='24px'>
        <FormControl>
          <FormLabel>ФИО</FormLabel>
          <Input required name='name' type='text' placeholder='Как к вам обращаться?' />
        </FormControl>

        <HStack spacing='24px'>
          <FormControl>
            <FormLabel>Выберите адрес</FormLabel>
            <Select defaultValue={address[0].address} required name='address' placeholder='Выберите адрес'>
              {address.map(x => <option key={x.id}>{x.address}</option>)}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Квартира</FormLabel>
            <Input required name='appartment' type='number' placeholder='123' />
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Обращение</FormLabel>
          <Textarea required name='application' placeholder='Введите, пожалуйста, текст заявки на обслуживание/ремонт' />
        </FormControl>

        <FormControl>
          <FormLabel>Номер договора</FormLabel>
          <InputGroup size='md'>
            <Input name='agreement' type='text' placeholder='10490194019409' />
          </InputGroup>
        </FormControl>

        <Button colorScheme='blue' variant='outline' type="submit">
          Отправить
        </Button>
      </VStack>
    </form>
  </main>
}

export default Cabinet

export async function getStaticProps() {
  const address = await getAddresses()
  return {
    props: { address },
  }
}