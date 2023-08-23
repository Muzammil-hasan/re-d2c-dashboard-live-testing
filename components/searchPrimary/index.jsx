"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaSearch } from "react-icons/fa"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/input"

import schema from "./schema"
import styles from "./style.module.scss"

const SearchPrimary = (props) => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      searchTerm: "",
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ searchTerm }) => {
          router.push(`${props.pathName}?searchTerm=${searchTerm}`)
        })}
      >
        <div className={`${styles.searchPrimary} ${props.className}`}>
          <div className={`${styles.formGroup} form-group`}>
            <FormField
              name="searchTerm"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Search queries" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className={styles.buttonIcon}>
              <FaSearch className={styles.inputSearch} size={15} />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default SearchPrimary
