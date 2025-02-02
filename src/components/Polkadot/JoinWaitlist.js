import React, { useContext, useMemo, useState } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  ResponsiveContext,
  Text,
  TextInput,
} from "grommet";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { validEmailReg } from "./regex";

const validateEmailAddress = (value) => {
  if (!validEmailReg.test(value)) {
    return { status: "error", message: "Enter a valid email address" };
  }
};

export const JoinWaitlist = ({ isEmailSubmitted, setIsEmailSubmitted }) => {
  const size = useContext(ResponsiveContext);
  const isSmall = useMemo(() => size === "small", [size]);

  const [emailAddress, setEmailAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const joinWaitlist = async () => {
    await addToMailchimp(
      emailAddress,
      {},
      "https://centrifuge.us17.list-manage.com/subscribe/post?u=27084e1d9e6f92398b5c7ce91&id=ee9cca24fc"
    );
    setIsSubmitting(false);
    setIsEmailSubmitted(true);
  };

  return (
    <Box width="366px">
      {isEmailSubmitted ? (
        <Box height="115px">
          <Text size="20px" weight={500} textAlign="center">
            Thanks for joining!
          </Text>
        </Box>
      ) : (
        <Box>
          <Box>
            <Form
              onSubmit={async () => {
                await joinWaitlist();
              }}
              validate="submit"
            >
              <FormField
                name="emailAddress"
                htmlFor="emailAddress"
                style={{ paddingBottom: "24px" }}
                validate={(value) => validateEmailAddress(value)}
              >
                <TextInput
                  disabled={isSubmitting}
                  id="emailAddress"
                  name="emailAddress"
                  onChange={(event) => {
                    setEmailAddress(event.target.value);
                  }}
                  placeholder="Email address"
                  value={emailAddress}
                  style={{ fontSize: isSmall ? 16 : 24 }}
                />
              </FormField>
              <Box align="center">
                <Button
                  color="brand"
                  disabled={isSubmitting}
                  label="Join the waitlist"
                  primary
                  type="submit"
                />
              </Box>
            </Form>
          </Box>
        </Box>
      )}
    </Box>
  );
};
