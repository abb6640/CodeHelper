import torch
from PIL import Image
from io import BytesIO
from transformers import CLIPProcessor, CLIPModel
import requests



def get_device() -> str: return "cuda" if torch.cuda.is_available() else "cpu"

device = get_device()
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(device)
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
labels = [
  
    "T-Shirt", "Shirt", "Blouse", "Tank Top", "Sweater", "Hoodie", "Jacket", "Coat", "Vest", "Cardigan",
    
    
    "Jeans", "Pants", "Shorts", "Skirt", "Leggings", "Trousers",
    
    "Dress", "Jumpsuit", "Romper", "Overalls", "Suit", "Bikini",
    
    "Shoes", "Sneakers", "Boots", "Heels", "Sandals", "Flip Flops", "Loafers",
    
 
    "Bag", "Backpack", "Handbag", "Wallet", "Belt", "Scarf", "Tie", "Watch",
    

    "Hat", "Cap", "Beanie", "Headband", "Hair Clip",
    
   
    "Necklace", "Earrings", "Bracelet", "Ring", "Brooch",
    
    "Glasses", "Sunglasses"
]
unknown_label = "Other"

def get_inputs(labels:[str], image:Image.Image):
    inputs = processor(text=labels, images=image, return_tensors="pt", padding=True)
    return {k: v.to(device) for k, v in inputs.items()}

def get_outputs(model:CLIPModel, inputs):return model(**inputs)




def get_best_label(image, candidate_labels, threshold=0.45):
    inputs = processor(text=candidate_labels, images=image, return_tensors="pt", padding=True).to(device)
    outputs = model(**inputs)
    logits_per_image = outputs.logits_per_image
    probs = logits_per_image.softmax(dim=1)

    best_idx = probs.argmax().item()
    best_prob = probs[0, best_idx].item()
    best_label = candidate_labels[best_idx]

    if best_prob < threshold:
        return "Other", best_prob
    else:
        return best_label, best_prob



def get_image_for_classification_from_url(url:str) -> None | Image.Image:
    response = requests.get(url=url)
    return  Image.open(BytesIO(response.content)).convert("RGB")

