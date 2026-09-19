import { forwardRef } from "react";
import { Flex } from "../flex/flex";
import { Label } from "../label/label";
import { Input, type InputProps } from "../input/input";
import { Text } from "../text/text";

export interface TextFieldProps extends InputProps {
    label?: string;
    required?: boolean;
    errorText?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({ label, required, errorText, id, error, ...props }, ref) => {
        return (
            <Flex direction="column" style={{ width: "100%" }} gap="0.25rem">
                {label ? (
                    <Label htmlFor={id} required={required} error={error || Boolean(errorText)}>
                        {label}
                    </Label>
                ) : null}
                <Input ref={ref} id={id} error={error || Boolean(errorText)} {...props} />
                {errorText ? (
                    <Text size="small" variant="error">
                        {errorText}
                    </Text>
                ) : null}
            </Flex>
        );
    }
);

TextField.displayName = "TextField";
