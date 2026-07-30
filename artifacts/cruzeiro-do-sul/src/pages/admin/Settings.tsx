import { AdminLayout } from "@/components/layout/AdminLayout";
import { useListSettings, useUpsertSetting, getListSettingsQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export function Settings() {
  const { data: settings, isLoading } = useListSettings();
  const upsertSetting = useUpsertSetting();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [formValues, setFormValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (settings) {
      const vals: Record<string, string> = {};
      settings.forEach(s => vals[s.key] = s.value);
      setFormValues(vals);
    }
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (key: string) => {
    upsertSetting.mutate({ key, data: { value: formValues[key] || "" } }, {
      onSuccess: () => {
        toast({ title: "Configuração salva" });
        queryClient.invalidateQueries({ queryKey: getListSettingsQueryKey() });
      },
      onError: () => {
        toast({ title: "Erro ao salvar", variant: "destructive" });
      }
    });
  };

  const settingFields = [
    { key: "site_name", label: "Nome do Site" },
    { key: "site_description", label: "Descrição (SEO)" },
    { key: "address", label: "Endereço Completo" },
    { key: "phone", label: "Telefone" },
    { key: "whatsapp", label: "WhatsApp (Apenas números)" },
    { key: "email", label: "E-mail de Contato" },
    { key: "instagram", label: "Link do Instagram" },
    { key: "facebook", label: "Link do Facebook" },
    { key: "attendance_form_url", label: "URL do Google Forms (Atendimento)" },
    { key: "google_maps_embed", label: "Iframe do Google Maps", isTextarea: true },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Configurações Globais</h1>
        <p className="text-muted-foreground mt-2">Gerencie as informações de contato e links do site.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border p-8 max-w-4xl">
        {isLoading ? (
          <div className="flex justify-center py-10"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>
        ) : (
          <div className="space-y-8">
            {settingFields.map(field => (
              <div key={field.key} className="flex flex-col md:flex-row md:items-start gap-4 pb-8 border-b border-border last:border-0 last:pb-0">
                <div className="w-full md:w-1/3">
                  <label className="font-bold text-sm text-foreground block mb-1">{field.label}</label>
                  <span className="text-xs text-muted-foreground font-mono">{field.key}</span>
                </div>
                <div className="w-full md:w-2/3 flex gap-2">
                  {field.isTextarea ? (
                    <textarea 
                      className="w-full p-3 rounded-lg border border-input text-sm h-32"
                      value={formValues[field.key] || ""}
                      onChange={e => handleChange(field.key, e.target.value)}
                    />
                  ) : (
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 rounded-lg border border-input text-sm"
                      value={formValues[field.key] || ""}
                      onChange={e => handleChange(field.key, e.target.value)}
                    />
                  )}
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="shrink-0"
                    onClick={() => handleSave(field.key)}
                  >
                    <Save size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
