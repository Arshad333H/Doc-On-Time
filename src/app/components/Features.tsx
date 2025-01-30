import { CloudRain } from "lucide-react";

const features = [
  {
    name: "Sign-up for free",
    Description:
      "Sign up now to connect with top doctors, schedule appointments effortlessly, and take control of your health—all in one place",
    icon: CloudRain,
  },
  {
    name: "Blazing fast",
    Description:
      "Experience ultra-fast booking and seamless navigation, ensuring you never waste a moment when scheduling appointments.",
    icon: CloudRain,
  },
  {
    name: "Super secure with nylas",
    Description:
      "Your data is safe with us! We use Nylas' industry-leading encryption to keep your personal and medical information secure.",
    icon: CloudRain,
  },
  {
    name: "Easy to use",
    Description:
      "Designed with simplicity in mind—book appointments with just a few taps, no tech skills required!",
    icon: CloudRain,
  },
];

export function Features() {
  return (
    <div className="py-24 ">
      <div className="max-w-2xl mx-auto lg:text-center ">
        <p className="font-semibold leading-7 text-primary">Schedule faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl ">
          Schedule Meetings in Minutes!
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground ">
          With DocOnTime you can schedule meetings in minutes. We make it easy
          for you to schedule meethings in minute. The meetings are very fast
          and easy to schedule
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.Description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
