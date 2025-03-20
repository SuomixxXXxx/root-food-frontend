import { useState } from "react";
export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      question: "Как оформить заказ?",
      answer:
        "Зарегестрируйтесь или войдите, выберите товары, перейдите в корзину и заполните форму оформления заказа.",
    },
    {
      question: "Какие способы оплаты вы принимаете?",
      answer:
        "На сайте можно оплатить заказ с помощью банковской карты. Если вам такое не подходит всегда можно оформить заказ вживую. ",
    },
    {
      question: "Когда будет готов заказ?",
      answer:
        "Обычно заказ готовится в течение 10 минут, затем приходит уведомление о готовности во вкладке Мои заказы.",
    },
    {
      question: "Что будет если я не успею забрать заказ?",
      answer:
        "Если вы не заберете заказ в течение 10 минут после готовности он будет утилизирован, деньги не будт возвращены.",
    },
  ];

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-screen bg-light-blue flex justify-center items-center">
      <div className="max-w-3xl md:mx-auto mx-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-8">
          Часто задаваемые вопросы
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg bg-white shadow-sm shadow-light-blue"
            >
              <button
                onClick={() => toggleItem(index)}
                className="flex justify-between items-center w-full p-4 md:p-6 focus:outline-none"
              >
                <span className="md:text-lg font-medium text-gray-900 text-left">
                  {item.question}
                </span>
                <span className="ml-6 h-7 flex items-center">
                  <svg
                    className={`h-6 w-6 transform transition-transform duration-500 ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="text-sm md:text-base p-4 border-t border-gray-200">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
