import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import { baseApi } from "~/lib/axios"
import BikeSearchDropdown from "~/components/ui/bikeSearchDropdown"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { InputDropdown } from "~/components/ui/input-dropdown"

import schema from "./schema"
// Styles here
import styles from "./style.module.scss"

const motorcycles = [
  {
    id: 1,
    label: "Royal Enfield Hunter 350 - 350 CC - Steller Black",
    value: "Royal Enfield Hunter 350 - 350 CC - Steller Black",
  },
  {
    id: 1,
    label: "Royal Enfield Hunter 350 - 350 CC - Steller Black",
    value: "Royal Enfield Hunter 350 - 350 CC - Steller Black",
  },
  {
    id: 1,
    label: "Royal Enfield Hunter 350 - 350 CC - Steller Black",
    value: "Royal Enfield Hunter 350 - 350 CC - Steller Black",
  },
  {
    id: 1,
    label: "Royal Enfield Hunter 350 - 350 CC - Steller Black",
    value: "Royal Enfield Hunter 350 - 350 CC - Steller Black",
  },
]

const BookingDetails = ({ guid }) => {
  const queryClient = useQueryClient()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      guid,
      orderId: "770c0255-8a62-4f00-bd40-381b6cbf2965",
      motorcycleDetails: {
        imageUrl: "/blob/hunter/royalenfield.com",
        model: "",
        engineCapacity: "",
        variant: "",
      },
      transactionDetails: {
        motorcycleAmount: 0,
        bookingAmount: 0,
      },
      applicantDetails: {
        name: "",
        fathersName: "",
        address: {
          state: "",
          city: "",
          detail: "",
        },
        ownershipStatus: "",
        contactDetails: {
          callingCode: "+91",
          mobile: "",
        },
        source: "Google Forms",
      },
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => baseApi.put("/booking/save-booking", data),
    onSuccess: ({ data }) => {
      console.log("🚀 data:", data)
      if (!data.success) return alert(data.message)
      queryClient.invalidateQueries({
        queryKey: ["bookingDetails"],
      })
      form.reset()
    },
    onError: ({ response }) => {
      alert(response.data.message)
    },
  })

  const hanldeClick = () => {
    console.log("Form>>>", form)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <div className={styles.bookingDetailsBody}>
          <div className={styles.detailHeading}>
            <span>Motorcycle Details</span>
          </div>

          <div className={styles.selectSection}>
            <div className={`${styles.profileBikeImg} mb-3 mb-lg-0 `}>
              <Image
                src="/d2c/admin/images/re-hunter.jpg"
                width="500"
                height="500"
                alt="not found"
              />
            </div>
            <BikeSearchDropdown className="w-100" />
          </div>

          <div className={styles.titleBorder}>
            <p>Total Amount</p>
            <hr />
          </div>
          <div className={styles.amountData}>
            <div className={`${styles.amountInput} row`}>
              <div className="col-12 col-md-6">
                <div className={styles.amountLabel}>
                  <span>Motorcycle Amount (Excluding Insurance)</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3 mb-lg-0 ">
                  <FormField
                    name="transactionDetails.motorcycleAmount"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className={styles.fullWidth}>
                        <FormMessage />
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.amountInput} row`}>
              <div className="col-12 col-md-6">
                <div className={styles.amountLabel}>
                  <span>Booking Amount</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3 mb-lg-0 ">
                  <FormField
                    name="transactionDetails.bookingAmount"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className={styles.fullWidth}>
                        <FormMessage />
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.titleBorder}>
            <hr />
          </div>

          <div className={styles.titleBorder}>
            <p>Booking Details</p>
            <hr />
          </div>

          <div className={styles.titleBorder}>
            <div className="d-flex justify-content-between align-items-center">
              <p className="m-0">Virtual Dealer</p>
              <h3 className="m-0">Delhi NCR</h3>
            </div>
            <hr />
          </div>

          <div className={styles.amountData}>
            <div className={`${styles.amountInput} row`}>
              <div className="col-12 col-md-6">
                <div className={styles.amountLabel}>
                  <span>Booking Id</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3 mb-lg-0 ">
                  <FormField
                    name="orderId"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className={styles.fullWidth}>
                        <FormMessage />
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.amountInput} row`}>
              <div className="col-12 col-md-6">
                <div className={styles.amountLabel}>
                  <span>Name </span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3 mb-lg-0 ">
                  <FormField
                    name="applicantDetails.name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className={styles.fullWidth}>
                        <FormMessage />
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.amountInput} row`}>
              <div className="col-12 col-md-6">
                <div className={styles.amountLabel}>
                  <span>Father&apos;s Name</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3 mb-lg-0 ">
                  <FormField
                    name="applicantDetails.fathersName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className={styles.fullWidth}>
                        <FormMessage />
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.amountInput} row`}>
              <div className="col-12 col-md-6">
                <div className={styles.amountLabel}>
                  <span>Email</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3 mb-lg-0 ">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className={styles.fullWidth}>
                        <FormMessage />
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.amountInput} row`}>
              <div className="col-12 col-md-6">
                <div className={styles.amountLabel}>
                  <span>Mobile</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3 mb-lg-0 ">
                  <FormField
                    name="applicantDetails.contactDetails.mobile"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className={styles.fullWidth}>
                        <FormMessage />
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.amountInput} row`}>
              <div className="col-12 col-md-6">
                <div className={styles.amountLabel}>
                  <span>Ownership Status</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <FormField
                  name="ownershipStatus"
                  control={form.control}
                  render={({ field: { onChange, name } }) => (
                    <FormItem className={styles.fullWidth}>
                      <FormMessage />
                      <FormControl>
                        <InputDropdown
                          name={name}
                          onChange={onChange}
                          data={motorcycles}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className={`${styles.amountInput} row`}>
              <div className="col-12 col-md-6">
                <div className={styles.amountLabel}>
                  <span>Address</span>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3 mb-lg-0 ">
                  <FormField
                    name="applicantDetails.address.city"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className={styles.fullWidth}>
                        <FormMessage />
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  onClick={hanldeClick}
                  type="submit"
                  size="small"
                  variant="accent"
                  disabled={isLoading}
                  style={{ float: "right" }}
                >
                  <span>{isLoading ? "adding..." : "Submit"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default BookingDetails
