import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

type FaqItem = {
  id?: string;
  question: string;
  answer: string;
  link?: { label: string; to: string };
};

type FAQSectionProps = {
  heading?: string;
  introduction?: string;
  items?: FaqItem[];
  variant?: "home" | "product";
};

const interText = {
  fontFamily: '"Inter Variable", "Inter", sans-serif',
  fontSize: "18px",
  fontWeight: 400,
};

const faqSecondaryText = {
  ...interText,
  color: "#3C3636",
};

const faqs = [
  {
    question: "Can I get same-day gift delivery in Karachi?",
    answer:
      "Yes. Eligible flowers and non-customized gifts listed on our website are available for same-day Karachi delivery when ordered before 2 PM Pakistan time.",
  },
  {
    question: "How do I arrange personalization?",
    answer:
      "Contact us on WhatsApp before ordering to discuss the available options for your chosen gift. Personalization requires additional preparation time.",
  },
  {
    question: "What is your return/refund policy?",
    answer:
      "Our return/refund policy has a 14-day window. Please read the full policy for conditions.",
  },
  {
    question: "Can I build my own gift box?",
    answer:
      "Yes. Choose your gifts, select a box, and add your message. For delivery outside Karachi, select items eligible for nationwide shipping.",
  },
  {
    question: "Can I send a gift to someone in Pakistan while I’m abroad?",
    answer:
      "Gift Unwrap is designed for gifting to recipients in Pakistan, including customers ordering from abroad. Check delivery eligibility for your chosen items and contact us if you need help with payment options before ordering.",
  },
  {
    question: "Do you deliver gifts across Pakistan?",
    answer:
      "Yes, selected gifts are available for delivery across Pakistan. Flowers and edible items cannot ship nationwide.",
  },
];

const answerContent = (faq: FaqItem) => {
  if (!faq.link) return faq.answer;
  const introduction = faq.answer.replace(faq.link.label, "");
  return <>{introduction}<Link to={faq.link.to}>{faq.link.label}</Link></>;
};

export default function FAQSection({
  heading = "You asked. We answered",
  introduction = "Clear answers to help you get started with ease.",
  items = faqs,
  variant = "home",
}: FAQSectionProps) {
  if (variant === "product") {
    return (
      <section className="gu-product-faq" aria-labelledby="gu-product-faq-title">
        <div className="gu-product-faq-heading">
          <h2 id="gu-product-faq-title">{heading}</h2>
          <p>{introduction}</p>
        </div>
        <Accordion className="gu-product-faq-list" type="single" collapsible>
          {items.map((faq, index) => (
            <AccordionItem className="gu-product-faq-item" key={faq.id || index} value={faq.id || `item-${index}`}>
              <AccordionTrigger className="gu-product-faq-question">{faq.question}</AccordionTrigger>
              <AccordionContent className="gu-product-faq-answer"><p>{answerContent(faq)}</p></AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="w-full px-4 py-[80px] sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2
            className="mb-[10px] tracking-tight text-foreground"
            style={{
              fontFamily: '"FONTSPRING DEMO - Recoleta Medium", "Recoleta", serif',
              fontSize: "48px",
              fontWeight: 500,
            }}
          >
            {heading}
          </h2>
          <p className="mx-auto max-w-xl" style={faqSecondaryText}>
            {introduction}
          </p>
        </div>

        <Accordion className="mx-auto w-full max-w-[1450px]" type="single" collapsible defaultValue="item-1">
          {items.map((faq, index) => (
            <AccordionItem key={faq.id || index} value={faq.id || `item-${index}`}>
              <AccordionTrigger
                className="text-left font-normal hover:text-[#FF2B3A] hover:no-underline focus-visible:text-[#FF2B3A] data-[state=open]:text-[#FF2B3A]"
                style={interText}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <span style={faqSecondaryText}>{answerContent(faq)}</span>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
