import Header from "./header";
const Slide1 = () => {
    return (
        <div className="margin_bot5 height_100">
            <Header></Header>


            <div className="BG"></div>
            <div className="grad"></div>



            <h1 className={" margin_top10 flex_center text_center h50vh"}>Управляющая организация <br /> ИП Стриганов М.С. </h1>
            <p className={'flex_center p_xxlarge text_center'}>
                Содержание, благоустройство жилых помещений и сервис ремонтных услуг
            </p>
        </div>
    )
}
export default Slide1;