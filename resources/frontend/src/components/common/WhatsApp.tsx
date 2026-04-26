import { whatsappAvatar } from "@/assets";
import { getConfig, getImageUrl } from "@/helper";
import { useConfig } from "@/hooks/useConfig";
import { FloatingWhatsApp } from "@digicroz/react-floating-whatsapp";

export const WhatsAppSetup = ({ title = "" }: { title?: string }) => {
    const config = useConfig();
    const siteIcon = getConfig(config, "site_icon")?.value as string;
    const siteName =
        (getConfig(config, "website_name")?.value as string) || "E-commerce";
    const whatsappNumber = getConfig(config, "whatsapp_number")
        ?.value as string;
    const whatsappStatus =
        (getConfig(config, "whatsapp_status")?.value as string) ||
        "Typically replies within 1 hour";
    const defaultChatMessage =
        (getConfig(config, "whatsapp_chat_message")?.value as string) ||
        "Hello! 👋 How can we help you today?";
    const detailsChatMessage =
        (getConfig(config, "details_whatsapp_message")?.value as string) ||
        "Hello! I'm interested in this product";

    if (title) {
        return (
            <a
                href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${detailsChatMessage}: ${title}`}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BA5C] text-white p-2 rounded-md cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 flex-shrink-0"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.485-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 2C6.48 2 2 6.59 2 12.253c0 2.1.63 4.043 1.71 5.645L2 22l4.24-1.11c1.57 1.07 3.41 1.68 5.3 1.68 5.52 0 10-4.59 10-10.253C22 6.59 17.52 2 12 2zm0 18c-1.55 0-3.07-.44-4.38-1.27l-.31-.2-3.24.85.86-3.18-.21-.33C4.1 14.3 3.6 13.2 3.6 12c0-4.64 3.76-8.4 8.4-8.4 4.64 0 8.4 3.76 8.4 8.4 0 4.64-3.76 8.4-8.4 8.4z" />
                </svg>
                Whatsapp
            </a>
        );
    }
    return (
        <FloatingWhatsApp
            phoneNumber={whatsappNumber}
            accountName={siteName}
            avatar={getImageUrl(siteIcon) || whatsappAvatar}
            statusMessage={whatsappStatus}
            chatMessage={defaultChatMessage}
            darkMode={false}
            allowClickAway={true}
            allowEsc={true}
            notification={true}
            notificationSound={true}
        />
    );
};
