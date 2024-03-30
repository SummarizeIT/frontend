import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    title: "Smart Summarization",
    description:
      "Get concise, actionable summaries of your meetings. Our AI Tool highlights the key points, so you can quickly catch up on any meeting.",
  },
  {
    title: "Multilingual Support",
    description:
      "Whether your meeting is in English or Arabic, our service provides seamless transcription and summarization without missing a beat.",
  },
  {
    title: "Record or Upload TO Receive Summaries",
    description:
      "Start a live transcription or upload an audio file from your meeting, to Get a clear, concise summary of your meeting, with the option to read the full transcription.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
