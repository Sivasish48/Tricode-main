import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { ChevronDown, LogOut } from 'lucide-react'

export function Profile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] bg-black text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Menu</SheetTitle>
          <SheetDescription className="text-gray-400">
            Access your saved codes or logout.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="saved-codes" className="text-white">
              Saved Codes
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-white border-white">
                  Select a code <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[280px] bg-gray-900 text-white">
                <DropdownMenuLabel>Your Saved Codes</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Code 1</DropdownMenuItem>
                <DropdownMenuItem>Code 2</DropdownMenuItem>
                <DropdownMenuItem>Code 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full text-white border-white">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

