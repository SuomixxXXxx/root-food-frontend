export default function AboutUsPage() {
  return (
    <div className="h-screen bg-light-blue flex">
      <div className="flex flex-col p-6 mt-20">
        <h1 className="text-3xl font-bold">О нас</h1>
        <div className="flex md:flex-row md:flex-wrap">
          <div className="flex-1">
            <ul className="text-xl">
              График работы:
              <li>Пн-Пт: 9:00 - 18:30</li>
              <li>Сб: 9:00 - 17:00</li>
              <li>
                Вс: <span className="text-dark-red">выходной</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <p className="text-lg">
              Наш адрес: Новосущёвская ул., 22, стр. 1, Москва, этаж 1
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
