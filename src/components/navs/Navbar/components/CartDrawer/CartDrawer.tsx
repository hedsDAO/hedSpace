import { CartItem } from "@/models/cart";
import { Dispatch, store } from "@/store/store";
import { calculateTotalCost } from "@/store/utils";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { NumberInput, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const navigate = useNavigate();
  const tempRef = useRef(null);
  const dispatch = useDispatch<Dispatch>();
  const isDrawerOpen = useSelector(store.select.cartModel.selectIsDrawerOpen);
  const cart = useSelector(store.select.cartModel.selectCart);
  const paymentUrl = useSelector(store.select.cartModel.selectPaymentUrl);

  const handleQuantiyChange = (e: string, index: number) => {
    dispatch.cartModel.updateCartItem({ index, quantity: e });
  };

  return (
    <Drawer trapFocus={false} size={{ base: "100%", lg: "md" }} isOpen={isDrawerOpen} placement="right" initialFocusRef={tempRef} onClose={() => dispatch.cartModel.setIsDrawerOpen(false)}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>cart</DrawerHeader>
        <DrawerBody as={Stack}>
          {cart?.length ? (
            cart?.map((item, index) => {
              return (
                <Flex key={item.name} bg="blackAlpha.200" p={2} alignItems={"center"} gap={5}>
                  <Image boxSize="4rem" src={item?.image} aspectRatio={1} />
                  <Stack>
                    <Flex alignItems={"end"} gap={1.5}>
                      {item?.size ? (
                        <Text fontSize={{ base: "xs", lg: "lg" }} fontWeight={"medium"}>
                          {item?.size?.slice(0, 3).toUpperCase()} /
                        </Text>
                      ) : (
                        ""
                      )}
                      <Text fontSize={{ base: "xs", lg: "lg" }} fontWeight={"medium"}>
                        {item?.name}
                      </Text>
                    </Flex>
                    <Text fontSize="sm" fontWeight={"normal"}>
                      {item?.price}
                    </Text>
                  </Stack>
                  <NumberInput
                    onChange={(e) => {
                      handleQuantiyChange(e, index);
                    }}
                    ml="auto"
                    maxW="6ch"
                    size="sm"
                    defaultValue={cart?.[index]?.quantity}
                    min={1}
                    max={5}
                  >
                    <NumberInputField
                      onFocus={() => {}}
                      defaultValue={+item?.quantity}
                      _disabled={{ borderColor: "transparent" }}
                      _focusVisible={{ borderColor: "transparent" }}
                      borderColor={"transparent"}
                      rounded="none"
                    />
                    <NumberInputStepper _disabled={{ borderColor: "transparent", color: "transparent" }} _focusVisible={{ borderColor: "transparent" }} borderColor={"transparent"} rounded="none">
                      <NumberIncrementStepper _disabled={{ borderColor: "transparent", color: "blackAlpha.500" }} borderColor={"transparent"} />
                      <NumberDecrementStepper _disabled={{ borderColor: "transparent", color: "blackAlpha.500" }} borderColor={"transparent"} />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text mr={3} fontSize="sm" color="blackAlpha.700" _hover={{ color: "black" }} as="i" onClick={() => dispatch.cartModel.removeCartItem(index)} className="fas fa-trash"></Text>
                </Flex>
              );
            })
          ) : (
            <Text fontSize="sm" fontStyle={"italic"} color="blackAlpha.600">
              there's nothing here...
            </Text>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Stack alignItems={"end"}>
            {cart?.length ? (
              <Flex alignItems={"baseline"} gap={3} mb={5}>
                <Text fontFamily={"inter"} fontSize={"sm"}>
                  total
                </Text>
                <Text fontFamily={"inter"} fontSize={"lg"}>
                  {" "}
                  {cart ? calculateTotalCost(cart) : null}
                </Text>
              </Flex>
            ) : (
              <></>
            )}
            <Flex>
              <Button
                color="black"
                border="1px"
                rounded="none"
                size="sm"
                bg="transparent"
                _focusVisible={{ borderColor: "black" }}
                _hover={{ background: "blackAlpha.200" }}
                mr={2}
                onClick={() => dispatch.cartModel.setIsDrawerOpen(false)}
              >
                cancel
              </Button>
              <Button
                onClick={() => {
                  if (cart) {
                    dispatch.cartModel.createPaymentLink(cart);
                    navigate("/redirect");
                  }
                }}
                isDisabled={cart?.length === 0 || !cart}
                color="white"
                rounded="none"
                size="sm"
                bg="black"
                _hover={{ background: "blackAlpha.700" }}
              >
                checkout
              </Button>
            </Flex>
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
