
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ClientDetailsProps {
  clientDetails: {
    name: string;
    email: string;
    address: string;
  };
  setClientDetails: (details: {
    name: string;
    email: string;
    address: string;
  }) => void;
}

const ClientDetailsCard = ({ clientDetails, setClientDetails }: ClientDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Client Name"
            value={clientDetails.name}
            onChange={(e) =>
              setClientDetails({ ...clientDetails, name: e.target.value })
            }
          />
          <Input
            type="email"
            placeholder="Client Email"
            value={clientDetails.email}
            onChange={(e) =>
              setClientDetails({ ...clientDetails, email: e.target.value })
            }
          />
        </div>
        <Input
          placeholder="Client Address"
          value={clientDetails.address}
          onChange={(e) =>
            setClientDetails({ ...clientDetails, address: e.target.value })
          }
        />
      </CardContent>
    </Card>
  );
};

export default ClientDetailsCard;
