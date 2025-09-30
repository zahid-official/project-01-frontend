import { cn } from "@/lib/utils";
import { OTPInput, type SlotProps } from "input-otp";
import { useId } from "react";

const InputOtp = ({ ...field }) => {
  const id = useId();
  return (
    <div className="*:not-first:my-2">
      <OTPInput
        id={id}
        containerClassName="flex items-center justify-center gap-3 has-disabled:opacity-50"
        maxLength={6}
        {...field}
        render={({ slots }) => (
          <div className="flex gap-3">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
    </div>
  );
};

const Slot = (props: SlotProps) => {
  return (
    <div
      className={cn(
        "border-input bg-background text-foreground flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
};

export default InputOtp;
