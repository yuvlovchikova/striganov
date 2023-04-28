import Link from "next/link";
import styles from "@/pages/articles/articles.module.css"
const Menu = () => {
    return (
        <div className={"black"}>
            <Link className={"p_menu1"} href={"/"}>
                Назад
            </Link>
            <nav className="flex_colom flex_center pt70">
                <Link href={'/#services'} className={"p_menu pr30"}>Услуги</Link>
                <Link href={'/#news'} className={"p_menu pr30"}>Новости</Link>
                <Link href={'/cabinet'} className={"p_menu pr30"}>Кабинет жильца</Link>
            </nav>
        </div>
    )
}
export default Menu;